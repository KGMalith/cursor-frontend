import React, { useState, useEffect, useRef } from "react";
import { CustomLoading } from "../../../../components/CustomLoadingComponent";
import io, { Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../redux/userSlice';
import { useWindowSize } from 'usehooks-ts'

export default function Home() {
  let [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [currentUserPosition, setCurrentUserPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socket = useRef<Socket | null>(null);
  const { first_name, last_name, image } = useSelector(userSelector);
  const { width, height } = useWindowSize();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_REST_SOCKET_SERVER ?? 'http://localhost:4000');

    socket.current.on('usersUpdate', (updatedUsers) => {
      setUsers(updatedUsers);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket && first_name && last_name && image) {
      socket.current?.emit('newUser', { first_name: first_name, last_name: last_name, image: image });
    }
  }, [first_name, last_name, image, socket])


  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;


    setCurrentUserPosition({ x:x, y:y });
    socket.current?.emit('cursorMove', { position: { x: x ? x : 0, y: y ? y : 0 }, user: { first_name: first_name, last_name: last_name, image: image } });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    //check current user inside user array. if exists remove current user
    let index = users.findIndex((item: any) => item.socketId == socket?.current?.id);
    if (index != -1) {
      users.splice(index, 1);
    }
    //loop through users list
    users.forEach(function (value: any) {
      context.beginPath();
      context.arc(value.position.x, value.position.y, 5, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();
      context.closePath();

      const image = new Image();
      image.src = value.image ? value.image : '/images/dummy-avatar.png';
      context.drawImage(image, value.position.x + 5, value.position.y + 5, 25, 25);

      context.font = '12px Arial';
      context.fillStyle = 'black';
      context.fillText(value.first_name, value.position.x + 10, value.position.y);
    });

    // Draw the current user's cursor
    context.beginPath();
    context.arc(currentUserPosition.x, currentUserPosition.y, 5, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();

    // Draw the current user's cursor
    const currentUserImage = new Image();
    currentUserImage.src = image ? image : '/images/dummy-avatar.png';// Replace with the path to the current user's image
    context.drawImage(currentUserImage, currentUserPosition.x + 5, currentUserPosition.y + 5, 25, 25);

    context.font = '12px';
    context.fillStyle = 'black';
    context.fillText('You', currentUserPosition.x + 10, currentUserPosition.y);
  }, [users, currentUserPosition, image]);

  return (
    <>
      {isLoading ?
        (
          <CustomLoading />
        )
        :
        (<canvas
          id="home"
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          style={{ width:width, height:height, backgroundColor: 'white' }}
        >

        </canvas>)
      }
    </>
  );
}
