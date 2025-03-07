/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Button, CopyInputField, DangerButton, LinkButton, Password, PrimaryButton } from "@wso2is/react-components";
import omit from "lodash-es/omit";
import React, { ReactElement } from "react";
import { Checkbox, Form, Input, Select } from "semantic-ui-react";
import { FieldButtonTypes } from "../models";

/**
 * The enter key.
 * @constant
 * @type {string}
 */
const ENTER_KEY = "Enter";

export const TextFieldAdapter = (props): ReactElement => {

    const { childFieldProps, input, meta, parentFormProps } = props;

    return (
        <Form.Input
            aria-label={ childFieldProps.ariaLabel }
            key={ childFieldProps.testId }
            required={ childFieldProps.required }
            data-testid={ childFieldProps.testId }
            label={ childFieldProps.label !== "" ? childFieldProps.label : null }
            onKeyPress={ (event: React.KeyboardEvent, data) => {
                event.key === ENTER_KEY && input.onBlur(data?.name);
            } }
            onChange={ (event, data) => {
                if (childFieldProps.listen && typeof childFieldProps.listen === "function") {
                    childFieldProps.listen(data?.value);
                }

                input.onChange(data?.value);
            } }
            onBlur={ (event) => input.onBlur(event) }
            control={ Input }
            autoFocus={ childFieldProps.autoFocus || false }
            type="text"
            value={ meta.modified ? input.value
                : (childFieldProps?.value ? childFieldProps?.value
                    : (parentFormProps?.values[ childFieldProps?.name ] ? parentFormProps?.values[ childFieldProps?.name ] : "")) }
            { ...omit(childFieldProps, [ "value", "listen" ]) }
            error={ meta?.modified && meta?.error !== "" ? meta?.error : null }
        />
    );
};

export const PasswordFieldAdapter = (props): ReactElement => {

    const { childFieldProps, input, meta, parentFormProps } = props;

    return (
        <Password
            key={ childFieldProps.testId }
            data-testid={ childFieldProps.testId }
            hidePassword="Hide password"
            label={ childFieldProps.label !== "" ? childFieldProps.label : null }
            name="newPassword"
            required={ true }
            showPassword="Show password"
            onKeyPress={ (event: React.KeyboardEvent, data) => {
                event.key === ENTER_KEY && input.onBlur(data?.name);
            } }
            onChange={ (event, data) => input.onChange(data?.value) }
            onBlur={ (event) => input.onBlur(event) }
            error={ meta?.touched && meta?.error !== "" ? meta?.error : null }
            autoFocus={ childFieldProps.autoFocus || false }
            { ...childFieldProps }
            value={ meta.modified ? input.value
                : (childFieldProps?.value ? childFieldProps?.value
                    : (parentFormProps?.values[ childFieldProps?.name ] ? parentFormProps?.values[ childFieldProps?.name ] : "")) }
        />
    );
};

export const CopyFieldAdapter = (props): ReactElement => {

    const { childFieldProps, parentFormProps } = props;
    const {
       label,
       ...filteredChildFieldProps
    } = childFieldProps;

    return (
        <Form.Group grouped={ true }>
            {
                label && (
                    <div className={ `field ${ filteredChildFieldProps.required ? "required" : "" }` }>
                        <label>{ label }</label>
                    </div>
                )
            }
            <Form.Field>
                <CopyInputField
                    key={ filteredChildFieldProps.testId }
                    data-testid={ filteredChildFieldProps.testId }
                    autoFocus={ filteredChildFieldProps.autoFocus || false }
                    { ...filteredChildFieldProps }
                    value={
                        filteredChildFieldProps?.value
                            ? filteredChildFieldProps?.value
                            : (parentFormProps?.values[ filteredChildFieldProps?.name ]
                                ? parentFormProps?.values[ filteredChildFieldProps?.name ]
                                : "")
                    }
                />
            </Form.Field>
        </Form.Group>
    );
};

export const TextAreaAdapter = (props): ReactElement => {

    const { childFieldProps, input, meta, parentFormProps } = props;

    return (
        <Form.TextArea
            label={ childFieldProps.label !== "" ? childFieldProps.label : null }
            width={ input.width }
            placeholder={ input.placeholder }
            name={ input.name }
            onBlur={ (event) => input.onBlur(event) }
            onChange={ (event, data) => {
                if (childFieldProps.listen && typeof childFieldProps.listen === "function") {
                    childFieldProps.listen(data?.value);
                }

                input.onChange(data?.value);
            } }
            autoFocus={ childFieldProps.autoFocus || false }
            readOnly={ input.readOnly }
            disabled={ input.disabled }
            required={ input.required }
            onKeyPress={ (event: React.KeyboardEvent, data) => {
                event.key === ENTER_KEY && input.onBlur(data.name);
            } }
            type="textarea"
            { ...omit(childFieldProps, [ "value", "listen" ]) }
            value={ meta.modified ? input.value : (childFieldProps?.value ? childFieldProps?.value
                : (parentFormProps?.values[ childFieldProps?.name ] ? parentFormProps?.values[ childFieldProps?.name ] : "")) }
            error={ meta?.modified && meta?.error !== "" ? meta?.error : null }
        />
    );
};

export const ToggleAdapter = (props): ReactElement => {

    const { childFieldProps, input, meta } = props;

    return (
        <Form.Checkbox
            label={ childFieldProps.label }
            name={ childFieldProps.name }
            children={ childFieldProps.children }
            onChange={ (event, data) => {
                if (childFieldProps.listen && typeof childFieldProps.listen === "function") {
                    childFieldProps.listen(data?.checked);
                }

                input.onChange(data?.checked);
            } }
            control={ Checkbox }
            readOnly={ childFieldProps.readOnly }
            disabled={ childFieldProps.disabled }
            defaultChecked={ !(childFieldProps.value.length == 0) }
            autoFocus={ childFieldProps.autoFocus || false }
            { ...childFieldProps }
        />
    );
};

export const SelectAdapter = (props): ReactElement => {

    const { childFieldProps, input, meta } = props;

    return (
        <Form.Select
            label={ childFieldProps.label }
            name={ childFieldProps.name }
            options={ childFieldProps.children }
            onChange={ (event: React.ChangeEvent<HTMLInputElement>, data) => {
                if (childFieldProps.listen && typeof childFieldProps.listen === "function") {
                    childFieldProps.listen(data.value.toString());
                }

                input.onChange(data.value.toString());
            } }
            onBlur={ (event: React.KeyboardEvent) => input.onBlur(event) }
            autoFocus={ childFieldProps.autoFocus || false }
            disabled={ childFieldProps.disabled }
            required={ childFieldProps.required }
            onKeyPress={ (event: React.KeyboardEvent, data) => {
                event.key === ENTER_KEY && input.onBlur(data?.name);
            } }
            control={ Select }
            { ...omit(childFieldProps, [ "value", "children" ]) }
            error={ meta?.modified && meta?.error !== "" ? meta?.error : null }
            value={ meta.modified ? input.value : (childFieldProps?.value ? childFieldProps?.value : "") }
        />
    );
};

export const ButtonAdapter = ({ childFieldProps }): ReactElement => {
    if (childFieldProps.buttonType === FieldButtonTypes.BUTTON_PRIMARY) {
        return (
            <PrimaryButton
                { ...omit(childFieldProps, [ "label" ]) }
                disabled={ childFieldProps.disabled }
                key={ childFieldProps.testId }
                type="submit"
            >
                { childFieldProps.label }
            </PrimaryButton>
        );
    } else if (childFieldProps.buttonType === FieldButtonTypes.BUTTON_CANCEL) {
        return (
            <LinkButton
                { ...omit(childFieldProps, [ "label" ]) }
                disabled={ childFieldProps.disabled }
                key={ childFieldProps.testId }
            >
                { "Cancel" }
            </LinkButton>
        );
    } else if (childFieldProps.buttonType === FieldButtonTypes.BUTTON_LINK) {
        return (
            <LinkButton
                { ...omit(childFieldProps, [ "label" ]) }
                disabled={ childFieldProps.disabled }
                key={ childFieldProps.testId }
            >
                { childFieldProps.label }
            </LinkButton>
        );
    } else if (childFieldProps.buttonType === FieldButtonTypes.BUTTON_DANGER) {
        return (
            <DangerButton
                { ...omit(childFieldProps, [ "label" ]) }
                disabled={ childFieldProps.disabled }
                key={ childFieldProps.testId }
            >
                { childFieldProps.label }
            </DangerButton>
        );
    } else {
        return (
            <Button
                { ...omit(childFieldProps, [ "label" ]) }
                disabled={ childFieldProps.disabled }
                key={ childFieldProps.testId }
            >
                { childFieldProps.label }
            </Button>
        );
    }
};
