import React from 'react';

interface Columnfilters{
    assigned:boolean;
    owner:boolean;
    lastmodified:boolean;
    lastopened:boolean;
}

interface projectfiltersProps{
    columns:Columnfilters;
    oncolumnchange:(column:keyof Columnfilters,value:boolean)=>void;
}
const projectfilters:React.FC<projectfiltersProps>=({
    columns,oncolumnchange })=>{
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 w-64">
          <h3 className="text-sm font-medium text-white mb-3">Show columns</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={columns.assigned}
                onChange={() => oncolumnchange('assigned', !columns.assigned)}
                className="rounded text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 mr-2"
              />
              <span className="text-gray-300">Assigned</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={columns.owner}
                onChange={() => oncolumnchange('owner', !columns.owner)}
                className="rounded text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 mr-2"
              />
              <span className="text-gray-300">Owner</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={columns.lastmodified}
                onChange={() => oncolumnchange('lastmodified', !columns.lastmodified)}
                className="rounded text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 mr-2"
              />
              <span className="text-gray-300">Last modified</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={columns.lastopened}
                onChange={() => oncolumnchange('lastopened', !columns.lastopened)}
                className="rounded text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 mr-2"
              />
              <span className="text-gray-300">Last opened by you</span>
            </label>
            
            
          </div>
        </div>
      );
}

export default projectfilters;