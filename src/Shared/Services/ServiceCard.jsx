import React from 'react';

const ServiceCard = ({ service }) => {
    const { icon, title, description}=service;
  return (
    <div className="card bg-base-200 hover:bg-[#CAEB66] shadow-md hover:shadow-xl transition-all duration-300 p-10">
      <div className="w-16 h-16 rounded-full bg-gradient-to-b from-primary to-blue-200 flex justify-center items-center text-primary text-2xl mb-4 mx-auto">
  {icon}
</div>
      <h3 className="text-xl font-semibold text-secondary mb-2">{title}</h3>
      <p className="text-base text-base-content">{description}</p>
    </div>
  );
};

export default ServiceCard;