import React from 'react';
import Banner from '../../Shared/Banner/Banner';
import OurServices from '../../Shared/Services/OurServices';
import ClientSlider from '../../Shared/ClientSlider';
import Benefits from '../../Shared/Benefits/Benefits';
import BeMarchant from './BeMarchant/BeMarchant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurServices></OurServices>
            <div className='my-10'>
                {/* Other sections */}
                <h2 className="text-4xl font-bold text-primary text-center mb-12">Our Clients</h2>
                <ClientSlider />
            </div>
            <Benefits></Benefits>
            <BeMarchant></BeMarchant>

        </div>
    );
};

export default Home;