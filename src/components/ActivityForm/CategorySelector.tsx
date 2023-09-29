import DropdownInput from '@/shared/components/DropdownInput';
import React, { ChangeEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityCategory } from '../../models/activity.model';
import { selectCategory, setCategory, setStep } from '../../store/form.store';

const categoryOptions = [
  { label: 'Teaching', value: 'TEACHING' },
  {
    label:
      'Creative Activity, Scholarship and Research/Professional Development',
    value: 'RESEARCH',
  },
  { label: 'Service', value: 'SERVICE' },
];

const CategorySelector: React.FC = () => {
  const category: ActivityCategory | null = useSelector(selectCategory);
  const dispatch = useDispatch();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newCategory: ActivityCategory = event.target
      .value as ActivityCategory;
    if (newCategory) {
      dispatch(setCategory(newCategory));
    }
  };

  const submit = () => {
    if (category) {
      dispatch(setStep('form'));
    }
  };

  const inputBox = 'border border-black rounded-lg px-3 py-2 outline-none';

  return (
    <div className="">
      <h1>Category</h1>
      <ol className="list-inside my-6 space-y-4">
        <li>Teaching: Educational activities that benefit NU students.</li>
        <li>
          Creative Activity, Scholarship and Research/Professional Development.
        </li>
        <li>Service: Activities outside of NU community.</li>
      </ol>
      <DropdownInput
        options={categoryOptions}
        placeholder="Select a Category"
        selectValue={(value) =>
          dispatch(setCategory(value as ActivityCategory))
        }
        addOnClass="min-w-[250px]"
      />
      <button
        className="bg-red-500 text-white disabled:bg-red-300 float-right mt-4"
        onClick={submit}
        disabled={category === null}
      >
        Next
      </button>
    </div>
  );
};

export default CategorySelector;
