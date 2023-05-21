import React, { useState } from 'react';
import styles from './userprofilecard.module.scss';
import { Button, Card, Col, Container, Form, Modal, ProgressBar, Spinner } from 'react-bootstrap';
import { CustomButton } from '../../../../../../components/CustomButtons';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CommonTextBox } from '../../../../../../components/CustomTextBox';
import {Upload } from 'react-feather';
import CustomUploadBox from '../../../../../../components/CustomUploadBox';
import { CustomAlert } from '../../../../../../components/CustomAlert';
import { getProfileImagePresignedURL, saveUserImage, updateProfile, uploadUserImage } from '../../../../../../services/utils/auth';
import { SubmitProfileImageFormikParameters, UpdateProfileFormikParameters } from '../../../../../../services/interfaces';

function UserProfile(props:any) {
  let [showModal, setShowModal] = useState(false);
  const [isSubmissionLoading, setSubmissionLoading] = useState(false);
  const [isFormSubmissionLoading, setFormSubmissionLoading] = useState(false);
  let [precentage, setPrecentage] = useState(0);
  const [isUploadSuccess, setUploadSuccess] = useState(false);
  let [isLoading, setLoading] = useState(false);

  const schema = yup.object({
    first_name: yup.string().required('Required'),
    last_name: yup.string().required('Required'),
  });

  //delete file function
  const deleteUploadedFiles = (files:Array<any>, index:number, setFieldValue:Function) => {
    files.splice(index, 1);
    setFieldValue('user_image', files);
  }

  //submit value
  const onSubmit = async (values:UpdateProfileFormikParameters) => {
    setFormSubmissionLoading(true);
    await updateProfile(values);
    setFormSubmissionLoading(false);
    props.loadUserProfile();
  }

  //submit value
  const onSubmitImage = async (values:SubmitProfileImageFormikParameters) => {
    setSubmissionLoading(true);
    let image_type = null;
    if (values.user_image) {
      let image_type_split = values.user_image[0]?.type.split('/');
      if (image_type_split) {
        image_type = image_type_split[1]
      }
    }
    await saveUserImage(image_type);
    setShowModal(false);
    setUploadSuccess(false);
    setSubmissionLoading(false);
    props.loadUserProfile();
  }

  //upload company thumbnail
  async function uploadFiles(file:Array<any>) {
    setLoading(true);
    let image_type_split = file[0].type.split('/');
    let respond:any = await getProfileImagePresignedURL(image_type_split[1])
    if (respond.success) {
      let upload_url = respond.data.presigned_url;
      let imageUploadRespond:any = await uploadUserImage(file[0], upload_url, setPrecentage);
      if (imageUploadRespond.status === 200) {
        setUploadSuccess(true);
      }
      setLoading(false);
    }
    setLoading(false);
  }


  function imageURL(image:Array<any>) {
    return URL.createObjectURL(image[0])
  }

  interface MyFormValues {
    user_image: any[];
  }
  
  const initialValues: MyFormValues = {
    user_image: [],
  };


  return (
    <div>
      <Card>
        <Card.Header className={styles.cardHeader}>
          <Container>
            <Card.Title className={styles.cardTopic}>User profile</Card.Title>
          </Container>
        </Card.Header>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{ email: props?.profileValues?.email, first_name: props?.profileValues?.first_name, last_name: props?.profileValues?.last_name }}>
          {({
            errors,
            handleChange,
            handleSubmit,
            submitCount,
            values
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Card.Body>
                <Container>
                  <div className={styles.imageUploadContainer}>
                    <div className={styles.avatarContainer}>
                      <img src={props?.profileValues?.image ? props?.profileValues?.image : '/images/dummy-avatar.png'} className={styles.avatar} alt="avatar" />
                    </div>
                    <div className={styles.imageuploadBox}>
                      <button className={`${styles.uploadBtn} btn btn-primary`} type="button" onClick={() => setShowModal(true)}>
                        <span className='me-2'><Upload strokeWidth={1} width={15} height={15} color='#ffffff' style={{ marginTop: '-5px' }} /></span>
                        Upload image
                      </button>
                    </div>
                  </div>
                  <Col className='mt-3'>
                    <CommonTextBox
                      disabled={true}
                      required={true}
                      label="Email"
                      name="email"
                      type="text"
                      handleOnChange={handleChange}
                      errorMessage={submitCount > 0 && errors.email}
                      isInvalid={submitCount > 0 && errors.email}
                      value={values.email}
                    />
                  </Col>
                  <Col className='mt-3'>
                    <CommonTextBox
                      required={true}
                      label="First name"
                      name="first_name"
                      type="text"
                      handleOnChange={handleChange}
                      errorMessage={submitCount > 0 && errors.first_name}
                      isInvalid={submitCount > 0 && errors.first_name}
                      value={values.first_name}
                    />
                  </Col>
                  <Col className='mt-3'>
                    <CommonTextBox
                      required={true}
                      label="Last name"
                      name="last_name"
                      type="text"
                      handleOnChange={handleChange}
                      errorMessage={submitCount > 0 && errors.last_name}
                      isInvalid={submitCount > 0 && errors.last_name}
                      value={values.last_name}
                    />
                  </Col>
                </Container>
              </Card.Body>
              <hr className={styles.cardHorizontalLine} />
              <Container>
                <Col className='p-3'>
                  <CustomButton
                    classType="defaultBtn"
                    buttonType="submit"
                    label="Save changes"
                    isLoading={isFormSubmissionLoading}
                    isButtonDisabled={isFormSubmissionLoading}
                  />
                </Col>
              </Container>
            </Form>
          )}
        </Formik>
      </Card>

      {/* Image upload modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false} centered size="lg">
        <Modal.Header>
          <Container>
            <Modal.Title className={styles.modalTitle}>Upload Image</Modal.Title>
          </Container>
          <Button className={styles.modalCancelBtn} onClick={() => setShowModal(false)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13.5 4.5L4.5 13.5" stroke="#3D56B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.5 4.5L13.5 13.5" stroke="#3D56B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </Modal.Header>
        <Formik
          onSubmit={(values) => onSubmitImage(values)}
          initialValues={initialValues}>
          {({
            handleSubmit,
            setFieldValue,
            values
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Container>
                  <Col>
                    <CustomUploadBox
                      isMultiUpload={false}
                      fileDescription="Only .jpg , .jpeg, .png files allowed, maximum file size is 10 MB"
                      maxFileSize={10485760}
                      acceptFileTypes={'image/jpeg,image/png,image/jpg'}
                      setFieldValue={setFieldValue}
                      uploadFiles={uploadFiles}
                      name="user_image"
                    />
                    {values.user_image &&
                      <div className='mt-4'>
                        {isLoading ?
                          <div>
                            <span>
                              <Spinner as="span" size="sm" role="status" animation="border" variant="dark" />
                              &nbsp;&nbsp;
                              <span className={styles.uploadDesc}>Uploading</span>
                              <ProgressBar animated now={precentage} striped variant="success" className={styles.ProgressBar} />
                            </span>
                          </div>
                          :
                          <div>
                            {
                              isUploadSuccess && values.user_image?.map((file, index) => (
                                <CustomAlert
                                  label="Company logo"
                                  keyCode={index}
                                  cssClassType="successAlert"
                                  isRemovable={true}
                                  alertLabel={file.name}
                                  handleOnChange={() => deleteUploadedFiles(values.user_image, index, setFieldValue)}
                                />
                              ))
                            }
                          </div>
                        }
                      </div>
                    }
                  </Col>
                  <Col className='mt-3'>
                    <div className='text-center'>
                      <div className={styles.avatarContainer}>
                        <img src={values.user_image.length > 0 ? imageURL(values.user_image) : '/images/dummy-avatar.png'} className={styles.avatar} alt="avatar" />
                        <p className={styles.uploadedImg} style={{ marginLeft: '0.8rem' }}>Image Preview</p>
                      </div>
                    </div>
                  </Col>
                </Container>
              </Modal.Body>
              <Modal.Footer className="justify-content-start">
                <Container>
                  <CustomButton
                    classType="defaultBtn"
                    buttonType="submit"
                    label="Upload Image"
                    isLoading={isSubmissionLoading}
                    isButtonDisabled={isSubmissionLoading}
                  />
                </Container>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}

export default UserProfile