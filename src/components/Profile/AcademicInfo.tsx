import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectEditing,
  selectPosition,
  selectResearchPercent,
  selectSabbatical,
  selectServicePercent,
  selectTeachingPercent,
  setPercent,
  setPosition,
  setSabbatical,
} from '@/store/profile.store';
import PercentageInfo from './PercentageInfo';
import {
  professorPositionLabel,
  professorPositionOptions,
  sabbaticalLabel,
  sabbaticalOptions,
} from '@/models/professorInfo.model';
import InputContainer from '@/shared/components/InputContainer';
import { ProfessorPosition, SabbaticalOption } from '@prisma/client';
import ProfileInfoSection from './ProfileInfoSection';
import DropdownInput from '@/shared/components/DropdownInput';
import TextField from '@/shared/components/TextField';

const AcademicInfo: React.FC = () => {
  const editing = useSelector(selectEditing);
  const position = useSelector(selectPosition);
  const sabbatical = useSelector(selectSabbatical);
  const teachingPercent = useSelector(selectTeachingPercent);
  const researchPercent = useSelector(selectResearchPercent);
  const servicePercent = useSelector(selectServicePercent);
  const dispatch = useDispatch();

  return (
    <ProfileInfoSection
      label="Academic Information"
      key="academic-profile-info"
    >
      <div className="flex w-full flex-col [&>*]:mb-5">
        <div className="flex w-full space-x-10">
          <div className="w-profile-field">
            <InputContainer
              label="Track"
              labelClass="text-sm font-normal"
              incomplete={editing && position === undefined}
              incompleteMessage="Must specify track."
              withMarginY
            >
              {editing ? (
                <DropdownInput<ProfessorPosition>
                  options={professorPositionOptions}
                  placeholder={'Select a Track'}
                  initialValue={professorPositionOptions.find(
                    (p) => p.value === position,
                  )}
                  selectValue={(p) => dispatch(setPosition(p))}
                  fillContainer
                />
              ) : (
                <TextField
                  value={position ? professorPositionLabel[position] : ''}
                  fillContainer
                />
              )}
            </InputContainer>
          </div>
          <div className="w-profile-field">
            <InputContainer
              label="Sabbatical"
              labelClass="text-sm font-normal"
              incomplete={editing && sabbatical === undefined}
              incompleteMessage="Must specify status."
              withMarginY
            >
              {editing ? (
                <DropdownInput<SabbaticalOption>
                  options={sabbaticalOptions}
                  placeholder={'Select a Track'}
                  initialValue={sabbaticalOptions.find(
                    (s) => s.value === sabbatical,
                  )}
                  selectValue={(s) => dispatch(setSabbatical(s))}
                  fillContainer
                />
              ) : (
                <TextField
                  value={sabbatical ? sabbaticalLabel[sabbatical] : ''}
                  fillContainer
                />
              )}
            </InputContainer>
          </div>
        </div>
        <InputContainer
          label="Activity Distribution"
          labelClass="text-sm font-normal"
          incomplete={
            editing &&
            (teachingPercent || 0) +
              (researchPercent || 0) +
              (servicePercent || 0) !==
              1
          }
          incompleteMessage="Percentages must sum to 100."
          withMarginY
        >
          <PercentageInfo
            editing={editing}
            teaching={teachingPercent || 0}
            research={researchPercent || 0}
            service={servicePercent || 0}
            setPercent={(type, percent) =>
              dispatch(setPercent({ type, percent }))
            }
          />
        </InputContainer>
      </div>
    </ProfileInfoSection>
  );
};

export default AcademicInfo;
