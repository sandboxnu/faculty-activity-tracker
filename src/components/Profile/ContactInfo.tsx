import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPhoneNumber,
  selectOfficeLocation,
  selectEditing,
  selectEmail,
  setEmail,
  setPhoneNumber,
  setOfficeLocation,
} from '@/store/profile.store';
import InputContainer from '@/shared/components/InputContainer';
import ProfileInfoSection from './ProfileInfoSection';
import TextField from '@/shared/components/TextField';
import TextInput from '@/shared/components/TextInput';
import {
  formatPhoneNumberWithSlashes,
  isValidEmail,
} from '@/shared/utils/misc.util';

const ContactInfo: React.FC = () => {
  const editing = useSelector(selectEditing);
  const phoneNumber = useSelector(selectPhoneNumber);
  const officeLocation = useSelector(selectOfficeLocation);
  const email = useSelector(selectEmail);
  const dispatch = useDispatch();

  return (
    <ProfileInfoSection label="Contact Information" key="contact-profile-info">
      <div className="flex flex-col">
        <div className="flex w-full space-x-10">
          <div className="w-profile-field">
            <InputContainer
              label="Phone Number"
              labelClass="text-sm font-normal"
              incomplete={editing && !!phoneNumber && phoneNumber.length !== 10}
              incompleteMessage="Invalid number."
              withMarginY
            >
              {editing ? (
                <TextInput
                  value={formatPhoneNumberWithSlashes(phoneNumber || '')}
                  placeholder="Enter phone number here"
                  change={(val) => dispatch(setPhoneNumber(val))}
                  fillContainer
                />
              ) : (
                <TextField
                  value={formatPhoneNumberWithSlashes(phoneNumber || '')}
                  fillContainer
                />
              )}
            </InputContainer>
          </div>
          <div className="w-profile-field">
            <InputContainer
              label="Office Location"
              labelClass="text-sm font-normal"
              withMarginY
            >
              {editing ? (
                <TextInput
                  value={officeLocation || ''}
                  placeholder="Enter office location here"
                  change={(val) => dispatch(setOfficeLocation(val))}
                  fillContainer
                />
              ) : (
                <TextField value={officeLocation || ''} fillContainer />
              )}
            </InputContainer>
          </div>
        </div>
        <div className="w-profile-field">
          <InputContainer
            label="Email"
            labelClass="text-sm font-normal"
            incomplete={editing && (!email || !isValidEmail(email))}
            incompleteMessage="Invalid email."
            withMarginY
          >
            {editing ? (
              <TextInput
                value={email || ''}
                placeholder="Enter email here"
                change={(val) => dispatch(setEmail(val))}
                fillContainer
              />
            ) : (
              <TextField value={email || ''} fillContainer />
            )}
          </InputContainer>
        </div>
      </div>
    </ProfileInfoSection>
  );
};

export default ContactInfo;
