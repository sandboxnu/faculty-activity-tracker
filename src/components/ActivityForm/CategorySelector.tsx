import React, { ChangeEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityCategory } from '../../models/activity.model';
import { selectCategory, setCategory, setStep } from '../../store/form.store';

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
      <p className="text-3xl mb-3">Category</p>
      <ol className="list-inside my-6 space-y-4">
        <li>Teaching: Educational activities that benefit NU students.</li>
        <li>
          Creative Activity, Scholarship and Research/Professional Development.
        </li>
        <li>Service: Activities outside of NU community.</li>
      </ol>
      <label>
        <div>
          <select
            value={category || ''}
            onChange={handleChange}
            className={inputBox + ' w-1/2'}
          >
            <option value="">Select a Category</option>
            <option value="TEACHING">Teaching</option>
            <option value="RESEARCH">
              Creative Activity, Scholarship and Research/Professional
              Development
            </option>
            <option value="SERVICE">Service</option>
          </select>
        </div>
      </label>
      <button
        className="bg-ruby border-ruby-dark text-white disabled:bg-ruby-disabled float-right mt-4"
        onClick={submit}
        disabled={category === null}
      >
        Next
      </button>
    </div>
  );
};

export default CategorySelector;
