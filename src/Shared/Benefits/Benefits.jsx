import React from 'react';
import img1 from '../../assets/live-tracking.png'
import img2 from '../../assets/live-tracking.png'
import img3 from '../../assets/live-tracking.png'
const benefits =[
  {
    "id": 1,
    "title": "Live Parcel Tracking",
    "description": "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    "image": img1
  },
  {
    "id": 2,
    "title": "100% Safe Delivery",
    "description": "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    "image": img2
  },
  {
    "id": 3,
    "title": "24/7 Call Center Support",
    "description": "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    "image": img3
  }
]

const Benefits = () => {
    return (
        <div className="py-10 bg-base-100">
      <div className="max-w-full mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Benefits</h2>
        <div className="flex flex-col gap-6 p-8">
          
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="card card-side bg-base-200 shadow-xl p-10 items-center"
            >
              <figure>
                <img src={benefit.image} alt="Benefit" className="h-24 w-24 object-contain" />
              </figure>
              <div className="divider divider-horizontal mx-4"></div>
              <div className="card-body p-0">
                <h2 className="card-title text-lg font-semibold">{benefit.title}</h2>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default Benefits;