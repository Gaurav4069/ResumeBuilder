import React from 'react';
import PersonalDetail from './forms/PersonalDetail';

function FormSection() {
  return (
    <div>
      <div>
        {/* Theme Button */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
          Theme
        </button>
      </div>

      {/* Personal details */}
      <PersonalDetail />

      {/* Summary */}

      {/* Experience */}

      {/* Education Details */}

      {/* Skills */}
    </div>
  );
}

export default FormSection;
