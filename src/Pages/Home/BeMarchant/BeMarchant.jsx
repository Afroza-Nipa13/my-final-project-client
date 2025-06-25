import React from 'react';

import location from '../../../assets/location-merchant.png'

const BeMarchant = () => {
    return (
        <div 
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] p-12 rounded-4xl">
  <div className="hero-content text-base-100 flex-col lg:flex-row" >
    
    <div>
      <h1 className="text-5xl font-bold">Box Office News!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn bg-primary border-none rounded-full">Become a merchent</button>
      <button className="btn btn-primary rounded-full btn-outline ms-4">Become a merchent</button>
    </div>

    <img
      src={location}
      className="max-w-sm rounded-lg shadow-2xl"
    />
  </div>
</div>
    );
};

export default BeMarchant;