import { MapContainer, TileLayer, Marker, Popup,useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import { useState } from 'react';

const CoverageMap = () => {
  const position = [23.8103, 90.4125]; // Dhaka coordinates
  const serviceCenters= useLoaderData()
  console.log(serviceCenters)
 const [searchText, setSearchText] = useState('');
  const [selectedCoords, setSelectedCoords] = useState(null);
  
  const filteredDistricts = serviceCenters.filter(d =>
    d.district.toLowerCase().includes(searchText.toLowerCase())
  );

  const FlyToDistrict = ({ coords }) => {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 14 ,{duration: 1.5}); // Zoom in
  }
  return null;
};
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        We are available in 64 districts
      </h2>
      
    <div className='mt-20'>
         <h3 className="text-xl font-semibold mb-4 text-center">Our Head Office Location</h3>
          <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-full max-w-md"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button  className='btn btn-primary'>Search</button>
      </div>

        
      {/* 🔽 Show Search Result List */}
      {searchText && (
        <div className="max-w-md mx-auto mb-6 bg-white border rounded-lg shadow p-4">
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map((d, i) => (
              <div
                key={i}
                className="cursor-pointer hover:text-primary font-medium py-1"
                onClick={() => {
                  setSelectedCoords([d.latitude, d.longitude]);
                  setSearchText(''); // optional: clear search
                }}
              >
                📍 {d.district}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No match found.</p>
          )}
        </div>
      )}

        <div className="w-full h-[1000px] mt-10">
      <MapContainer center={position} zoom={8} scrollWheelZoom={true} className="h-full w-full rounded-lg shadow-md">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {
            serviceCenters.map((center, index)=><Marker 
             key={index}
                position={[center.latitude, center.longitude]}>
          <Popup>
            We are here in <strong>Dhaka</strong>!
          </Popup>
        </Marker>)
        }
         {/* 🔄 Fly to searched district */}
          {selectedCoords && <FlyToDistrict coords={selectedCoords} />}
      </MapContainer>
    </div>
    </div>
    </div>
  );
};

export default CoverageMap;
