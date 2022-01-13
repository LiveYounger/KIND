import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';
import { TextInputField } from '../shared/FormFields';
import { Text, TouchableOpacity, View } from 'react-native';
import { uFlexGrow, uGapLeft, uPad, uTextWhite, uFlexJustifyEnd } from '../../styles/utilities';
import IconTick from '../../assets/icons/tick.svg';
import variables from '../../styles/variables';
import { iconBase } from '../../styles/icons';

const ProfileInlineEditable = ({ handleSubmit, caption, field, form, ...props }) => {
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleUpdate = () => {
    toggleEdit();
    handleSubmit();
  };

  const saveButton = (
    <TouchableOpacity style={[uGapLeft, uPad]} onPress={handleUpdate}>
      <IconTick style={iconBase} fill={variables.colors.white} />
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity onPress={toggleEdit}>
      <ProfileItem text={!edit && caption}>
        {!!edit && (
          <View style={uFlexGrow}>
            <TextInputField field={field} form={form} {...props} />
          </View>
        )}
        {edit ? (
          saveButton
        ) : (
          <Text style={[uTextWhite, uFlexJustifyEnd]}>{form.initialValues[field.name]}</Text>
        )}
      </ProfileItem>
    </TouchableOpacity>
  );
};

ProfileInlineEditable.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  caption: PropTypes.string,
  handleSubmit: PropTypes.func
};

export default ProfileInlineEditable;
