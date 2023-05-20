import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './custombuttons.module.scss';

export const CustomButton = (props:any) => {
    return (
        <div>
            <button
                className={`
                    ${props.classType === 'primaryBtn' ? `${styles.primaryBtn} btn btn-primary` :
                        props.classType === 'secondaryBtn' ? `${styles.secondaryBtn} btn btn-primary` :
                            props.classType === 'defaultBtn' ? `${styles.defaultBtn} btn btn-primary` :
                                props.classType === 'modalBlueBtn' ? `${styles.modalBlueBtn} btn btn-primary` :
                                    props.classType === 'modalRedBtn' ? `${styles.modalRedBtn} btn btn-danger` :
                                        props.classType === 'modalGreenBtn' ? `${styles.modalGreenBtn} btn btn-success` :
                                            props.classType === 'addBtn' ? `${styles.addBtn} btn`:
                                            props.classType === 'connectBtn' ? `${styles.connectBtn} btn btn-primary` :
                                                props.classType === 'disconnectBtn' ? `${styles.disconnectBtn} btn btn-danger` :
                                            props.classType === 'cancelBtn' && `${styles.cancelBtn} btn btn-light`
                    }
                `}
                disabled={props.isButtonDisabled}
                onClick={props.handleClick}
                name={props.buttonName}
                type={props.buttonType}
            >
                {props.frontIcon && props.frontIcon}
                &nbsp;&nbsp;
                {props.label}
                &nbsp;&nbsp;
                {props.isLoading?
                    <Spinner as="span" size="sm" role="status" animation="border" variant="light" />
                    :
                    props.backIcon && props.backIcon
                }
            </button>
        </div>
    )
}

CustomButton.defaultProps = {
    classType: "primaryBtn",
    buttonType: 'button'
}