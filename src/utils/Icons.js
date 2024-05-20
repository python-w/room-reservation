import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPaw, faClock } from '@fortawesome/free-solid-svg-icons';

export const amenityIcons = {
    "2 Double Beds": <FontAwesomeIcon icon={faBed} />,
};

export const restrictionIcons = {
    "No Pets Allowed": <FontAwesomeIcon icon={faPaw} />,
}

export const featureIcons = {
    "2 Double beds": <FontAwesomeIcon icon={faBed} />,
}

export const additionalIcons = {
    "Check-In at 2 PM": <FontAwesomeIcon icon={faClock} />,
}


export const iCalendarQuestion = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" className='custom_icon'>
    <path d="M15.1,1.4h-3.4c0-0.5-0.4-0.8-0.8-0.8c-0.5,0-0.8,0.4-0.8,0.8H6C6,1,5.6,0.6,5.1,0.6C4.7,0.6,4.3,1,4.3,1.4H0.9
	c-0.5,0-0.8,0.4-0.8,0.8v13.3c0,0.5,0.4,0.8,0.8,0.8h14.2c0.5,0,0.8-0.4,0.8-0.8V2.3C15.9,1.8,15.5,1.4,15.1,1.4z M4.3,3.1
	c0,0.5,0.4,0.8,0.8,0.8C5.6,3.9,6,3.5,6,3.1h4.1c0,0.5,0.4,0.8,0.8,0.8c0.5,0,0.8-0.4,0.8-0.8h2.5v1.7H1.8V3.1H4.3z M1.8,14.8V6.4
	h12.5v8.3H1.8z"  fill='currentColor' />
    <path d="M8.5,7.2C7.6,7,6.6,7.3,6.1,8.1C5.9,8.5,6,9,6.3,9.2C6.7,9.5,7.2,9.4,7.5,9C7.6,8.9,7.8,8.8,8,8.8
	c0.1,0,0.3,0.2,0.3,0.3C8.4,9.4,8.2,9.7,8,9.7c-0.6,0.2-1,0.7-1,1.3v0.5c0,0.5,0.4,0.8,0.8,0.8c0.5,0,0.8-0.4,0.8-0.8v-0.2
	c1-0.4,1.5-1.5,1.2-2.5C9.8,8,9.2,7.4,8.5,7.2L8.5,7.2z"  fill='currentColor' />
    <path d="M7.6,12.5c-0.1,0-0.2,0.1-0.3,0.2c-0.2,0.2-0.2,0.4-0.2,0.6c0,0.1,0,0.2,0.1,0.3c0,0.1,0.1,0.2,0.2,0.3
	c0.2,0.2,0.4,0.2,0.6,0.2c0.1,0,0.2,0,0.3-0.1c0.1,0,0.2-0.1,0.3-0.2c0.1-0.1,0.1-0.2,0.2-0.3s0.1-0.2,0.1-0.3
	c0-0.2-0.1-0.4-0.2-0.6C8.3,12.4,7.9,12.4,7.6,12.5z"  fill='currentColor' /></svg>
export const iCalendarArrow = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17" className='custom_icon'>
    <path d="M16.2,1.2h-3.5c0-0.5-0.4-0.9-0.9-0.9s-0.9,0.4-0.9,0.9H6.9c0-0.5-0.4-0.9-0.9-0.9S5.2,0.7,5.2,1.2H1.7
		c-0.5,0-0.9,0.4-0.9,0.9v5.6c0,0.5,0.4,0.9,0.9,0.9s0.9-0.4,0.9-0.9V6.3h12.8v8.6H2.6v-1.3c0-0.5-0.4-0.9-0.9-0.9s-0.9,0.4-0.9,0.9
		v2.1c0,0.5,0.4,0.9,0.9,0.9h14.5c0.5,0,0.9-0.4,0.9-0.9V2.1C17.1,1.6,16.7,1.2,16.2,1.2z M15.4,4.6H2.6V2.9h2.6
		c0,0.5,0.4,0.9,0.9,0.9s0.9-0.4,0.9-0.9h4.2c0,0.5,0.4,0.9,0.9,0.9s0.9-0.4,0.9-0.9h2.6V4.6z"  fill='currentColor' />
    <path d="M1.7,11.5h4.8l-0.7,0.7c-0.3,0.3-0.3,0.9,0,1.2c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.4-0.1,0.6-0.2l2.1-2.1
		c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.2,0.1-0.4,0-0.6c0-0.1-0.1-0.2-0.2-0.3L7,7.9c-0.3-0.3-0.9-0.3-1.2,0s-0.3,0.9,0,1.2l0.7,0.7H1.7
		c-0.5,0-0.9,0.4-0.9,0.9v0C0.9,11.1,1.2,11.5,1.7,11.5z"  fill='currentColor' /></svg>
export const iUser = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17" className='custom_icon'>
    <path d="M9,8.5c-2.3,0-4.2-1.9-4.2-4.2S6.7,0.2,9,0.2c2.3,0,4.2,1.9,4.2,4.2S11.3,8.5,9,8.5z M9,1.9
	C7.6,1.9,6.5,3,6.5,4.4S7.6,6.9,9,6.9c1.4,0,2.5-1.1,2.5-2.5S10.4,1.9,9,1.9z" fill='currentColor' />
    <path d="M16.7,16.8H1.3c-0.5,0-0.8-0.4-0.8-0.8c0-0.8,0.2-1.5,0.6-2.2C2.8,11,5.7,9.3,9,9.3c3.3,0,6.2,1.7,7.9,4.4
	c0.4,0.7,0.6,1.4,0.6,2.2C17.6,16.4,17.2,16.8,16.7,16.8z M2.2,15.1h13.5c-0.1-0.2-0.1-0.3-0.2-0.5C14.1,12.4,11.7,11,9,11
	c-2.7,0-5.1,1.4-6.5,3.6C2.4,14.8,2.3,15,2.2,15.1L2.2,15.1z" fill='currentColor' /></svg>
export const iSearch = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" className='custom_icon'>
    <path d="M19.7,18.3l-5.4-5.4c1-1.4,1.7-3,1.7-4.9c0-4.4-3.6-8-8-8S0,3.6,0,8c0,4.4,3.6,8,8,8c1.9,0,3.5-0.6,4.9-1.7l5.4,5.4
c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3C20.1,19.3,20.1,18.7,19.7,18.3L19.7,18.3z M8,14c-3.3,0-6-2.7-6-6c0-3.3,2.7-6,6-6
s6,2.7,6,6C14,11.3,11.3,14,8,14z" fill='currentColor' /></svg>
export const iChevronLeft = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12"  className='custom_icon'><path d="M3.4,6L8,1.4L6.6,0l-6,6l6,6L8,10.6L3.4,6z" /></svg>
export const iChevronRight = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12"  className='custom_icon'><path d="M4.6,6L0,1.4L1.4,0l6,6l-6,6L0,10.6L4.6,6z" />
</svg>
export const iMapMarker = <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" className='custom_icon'>
<path d="M7,4C6.4,4,5.8,4.2,5.3,4.5C4.7,4.9,4.3,5.4,4.1,5.9C3.9,6.5,3.8,7.1,3.9,7.7c0.1,0.6,0.4,1.2,0.9,1.6
	c0.4,0.4,1,0.7,1.6,0.9C7,10.3,7.6,10.2,8.2,10c0.6-0.2,1.1-0.6,1.4-1.2c0.3-0.5,0.5-1.1,0.5-1.7c0-0.8-0.3-1.6-0.9-2.2S7.8,4,7,4z
	 M7,9C6.6,9,6.3,8.9,6,8.7C5.6,8.5,5.4,8.2,5.3,7.8C5.1,7.5,5.1,7.1,5.2,6.8c0.1-0.4,0.3-0.7,0.5-1c0.3-0.3,0.6-0.4,1-0.5
	c0.4-0.1,0.7,0,1.1,0.1c0.3,0.1,0.6,0.4,0.8,0.7c0.2,0.3,0.3,0.7,0.3,1c0,0.5-0.2,1-0.5,1.3C8,8.8,7.5,9,7,9z M7,0.2
	c-1.8,0-3.6,0.7-4.9,2c-1.3,1.3-2,3-2,4.9c0,2.5,1.1,5.1,3.3,7.5c1,1.1,2.1,2.1,3.2,3c0.1,0.1,0.2,0.1,0.4,0.1c0.1,0,0.3,0,0.4-0.1
	c1.2-0.9,2.3-1.9,3.2-3c2.1-2.5,3.3-5.1,3.3-7.5c0-1.8-0.7-3.6-2-4.9C10.6,1,8.8,0.3,7,0.2z M7,16.3c-1.3-1-5.6-4.7-5.6-9.2
	c0-1.5,0.6-2.9,1.6-4c1.1-1.1,2.5-1.6,4-1.6s2.9,0.6,4,1.6c1.1,1.1,1.6,2.5,1.6,4C12.6,11.6,8.3,15.3,7,16.3z"/></svg>

