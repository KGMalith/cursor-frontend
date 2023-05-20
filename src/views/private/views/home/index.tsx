import React, { useState, useEffect } from "react";
import {
  Col,
} from "react-bootstrap";
import { CustomLoading } from "../../../../components/CustomLoadingComponent";

export default function Home() {
  let [isLoading, setLoading] = useState(false);

  return (
    <>
      {isLoading ?
        (
          <CustomLoading />
        )
        :
        (<canvas
          id="home"
          className="pt-5"
          style={{ minHeight:"calc(100vh - 72px)", width: '100%', backgroundColor: 'white' }}
        >

        </canvas>)
      }
    </>
  );
}
