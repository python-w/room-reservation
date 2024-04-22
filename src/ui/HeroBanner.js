import heroBanner from '../images/hero-banner.jpg'


export default function HeroBanner() {
    return (
        <div className="room_reservation_banner" style={{ backgroundImage: `url(${heroBanner})` }}>
            <div className="room_reservation_title">
                <h2>Find a perfect room</h2>
                <p>Search best deals on rooms based on your preferences</p>
            </div>
        </div>
    )
}
