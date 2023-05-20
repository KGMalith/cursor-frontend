import React from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Info } from 'react-feather';
import styles from './customtextbox.module.scss';

export const CommonTextBox = (props:any) => {

    const tooltip = (
        <Tooltip id="tooltip">
            {props.tooltip}
        </Tooltip>
    );

    return (
        <div>
            <Form.Group controlId={props.controlId}>
                {props.label &&
                    <Form.Label
                        className={`
                            ${props.classLabel === 'defaultLabel' ? styles.defaultLabel : ''}
                            `}>
                        {props.required && <span className={styles.requiredIcon}>*</span>}
                        {props.label}
                        <span className={styles.minLabel}>{props.minLabel}</span>
                        {props.isTooltipEnabled &&
                            <span className='ms-2'>
                                <OverlayTrigger overlay={tooltip} placement="auto">
                                    <Info strokeWidth={2} width={16} height={16} stroke='#84888F' style={{ marginTop: '-7px',cursor:'pointer' }} />
                                </OverlayTrigger>
                            </span>
                        }
                    </Form.Label>
                }
                <Form.Control
                    className={`
                            ${props.classType === 'defaultTextBox' && props.frontIcon ? styles.paddingTextBox : ''}
                            ${props.classType === 'defaultTextBox'? styles.defaultTextBox : ''}
                        `}
                    placeholder={props.placeholder}
                    onChange={props.handleOnChange}
                    autoComplete={props.autoComplete}
                    name={props.name}
                    type={props.type}
                    isInvalid={props.isInvalid}
                    value={props.value}
                    disabled={props.disabled}
                    maxLength={props.maxlength}
                    readOnly={props.readOnly}
                />
                {props.frontIcon && 
                    <div className={styles.frontIconContainer}>
                        {props.frontIcon}
                    </div>
                }
                {props.errorMessage &&
                    <span className={styles.errorMsg}>
                        {props.errorMessage}
                    </span>
                }
            </Form.Group>
        </div>
    )
};

CommonTextBox.defaultProps = {
    classType: 'defaultTextBox',
    classLabel: 'defaultLabel'
};



