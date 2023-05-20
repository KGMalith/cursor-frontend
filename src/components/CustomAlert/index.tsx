import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import styles from './alert.module.scss';
import { Trash } from 'react-feather';

export const CustomAlert = (props:any) => {
    return (
        <div>
            {props.isNotificationAlert ?
                <Alert key={props.keyCode} variant={'light'} className={props.cssClassType === 'danger' ? styles.errorNotificationAlert : props.cssClassType === 'warning' ? styles.warningNotificationAlert : ''}>
                    <div className={styles.textContainer}>
                        <p className='mb-0'><span className={styles.alertNotificationLabel}>{props.label}</span><span className={styles.alertNotificationMessage}>{props.message}</span></p>
                    </div>
                </Alert>
                :
                <Alert key={props.keyCode} variant={'light'} className={props.cssClassType === 'errorAlert' ? styles.errorAlert : props.cssClassType === 'successAlert' ? styles.successAlert : ''}>
                    {props.isRemovable ?
                        <Row>
                            <Col style={{ alignSelf: 'flex-end', fontSize: 'var( --app-small-font-size)' }}>
                                {props.alertLabel}
                            </Col>
                            <Col sm={2} className="text-end">
                                <Trash strokeWidth={2} width={18} height={18} color='#EA5C5C' onClick={props.handleOnChange} className={styles.deleteIcon} />
                            </Col>
                        </Row>
                        :
                        <span>
                            {props.alertLabel}
                        </span>
                    }
                </Alert>
            }

        </div>
    )
}

CustomAlert.defaultProps = {
    isNotificationAlert: false,
}
