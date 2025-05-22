import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  subtext?: string;
  leftborder?:boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = 'green',
  subtext,
  leftborder=true
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-green-500 text-white';
      case 'blue':
        return 'bg-blue-500 text-white';
      case 'purple':
        return 'bg-purple-500 text-white';
      case 'orange':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className={`relative   p-4 w-full`}>
      <div className={`flex space-x-4 items-center    `}>
        {leftborder?
        <div className='h-[90px]   w-[2px] bg-gray-700'></div>
         :''}
        <div className=''>
        <p className="text-gray-400 text-sm mb-2">{title}</p>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">{value}</h2>
          {icon && (
            <div className={`rounded-full p-2 ${getColorClasses()}`}>
              {icon}
            </div>
          )}
        </div>
        {subtext && <p className="text-gray-400 text-xs mt-2">{subtext}</p>}
        </div>
      </div>
    </div>
  );
};

export default StatCard; 