import React,{useState} from 'react';
import styles from './userpasswordcard.module.scss';
import { Card, Col, Container, Form } from 'react-bootstrap';
import { CustomButton } from '../../../../../../components/CustomButtons';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CommonTextBox } from '../../../../../../components/CustomTextBox';
import { UpdatePasswordFormikParameters } from '../../../../../../services/interfaces';

function UserPassword() {
  const [isFormSubmissionLoading, setFormSubmissionLoading] = useState(false);

  const schema = yup.object({
    current_password: yup.string().required('Required'),
    new_password: yup.string().required('Required'),
    confirm_password: yup.string()
      .oneOf([yup.ref('new_password'), ''], 'New Password and Confirm Password must match').nullable()
  });

  //submit value
  const onSubmit = async (values:UpdatePasswordFormikParameters) => {
    setFormSubmissionLoading(true);
    // await updatePassword(values);
    setFormSubmissionLoading(false);
  }

  return (
    <div className='mt-5'>
      <Card>
        <Card.Header className={styles.cardHeader}>
          <Container>
            <Card.Title className={styles.cardTopic}>User password</Card.Title>
          </Container>
        </Card.Header>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => onSubmit(values)}
          initialValues={{
            current_password:'',
            new_password:'',
            confirm_password:''
          }}>
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
                  <Col>
                    <CommonTextBox
                      required={true}
                      label="Current password"
                      name="current_password"
                      type="password"
                      handleOnChange={handleChange}
                      errorMessage={submitCount > 0 && errors.current_password}
                      isInvalid={submitCount > 0 && errors.current_password}
                      value={values.current_password}
                    />
                  </Col>
                  <Col className='mt-3'>
                    <CommonTextBox
                      required={true}
                      label="New password"
                      name="new_password"
                      type="password"
                      handleOnChange={handleChange}
                      errorMessage={submitCount > 0 && errors.new_password}
                      isInvalid={submitCount > 0 && errors.new_password}
                      value={values.new_password}
                    />
                  </Col>
                  <Col className='mt-3'>
                    <CommonTextBox
                      required={true}
                      label="Confirm password"
                      name="confirm_password"
                      type="password"
                      handleOnChange={handleChange}
                      errorMessage={submitCount > 0 && errors.confirm_password}
                      isInvalid={submitCount > 0 && errors.confirm_password}
                      value={values.confirm_password}
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
    </div>
  )
}

export default UserPassword;