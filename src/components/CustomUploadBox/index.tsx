import React from 'react';
import styles from './uploadbox.module.scss';
import Dropzone from 'react-dropzone'
import { CustomAlert } from '../CustomAlert';
import { Form } from 'react-bootstrap';

export default function CustomUploadBox(props:any) {

    return (
        <div>
            <Form.Group controlId={props.controlId}>
                {props.label &&
                    <Form.Label
                        className={styles.defaultLabel}>
                        {props.required && <span className={styles.requiredIcon}>*</span>}
                        {props.label}
                    </Form.Label>
                }
                <Dropzone multiple={props.isMultiUpload} maxFiles={props.maxFilesNumber} maxSize={props.maxFileSize} accept={props.acceptFileTypes} onDrop={acceptedFiles => { props.setFieldValue(props.name, acceptedFiles); props.uploadFiles && props.uploadFiles(acceptedFiles) }}>
                    {({ getRootProps, getInputProps, fileRejections }) => (
                        <section>
                            <div {...getRootProps({ className: props.isInvalid === true ? styles.dropzoneInvalid : styles.dropzone })}>
                                <input {...getInputProps()} />
                                <span className={styles.fileText}><span className={styles.selectFileTxt}>Select a file</span> or drag and drop here</span>
                            </div>
                            {props.errorMessage && <p className={styles.errormessage}>{props.errorMessage}</p>}
                            <span className={styles.fileDesc}>{props.fileDescription}</span>
                            <aside>
                                {
                                    fileRejections.map(({ file, errors }) => (
                                        errors.map(e => (
                                            <CustomAlert keyCode={file.name} cssClassType={'errorAlert'} alertLabel={e.code === 'file-too-large' ? `File is larger than 10MB` : e.code === 'file-invalid-type' ? 'Invalid file type' : e.code === 'too-many-files' ? 'Maximum 10 files allowed' : e.message} />
                                        ))
                                    ))
                                }
                            </aside>
                        </section>
                    )}
                </Dropzone>
            </Form.Group>
        </div>
    )
}
