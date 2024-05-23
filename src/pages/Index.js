import Search from '../features/search/Search';
import useScrollToTop from '../hooks/useScrollToTop';
import HeroBannner from '../ui/HeroBanner'
import IndexPlaceholder from '../ui/IndexPlaceholder';

export default function Index() {
    useScrollToTop();

    const hasBanner = true;

    return (
        <div className={`${hasBanner ? 'portlet_has_banner' : ''}`}>
            {hasBanner ?
                <HeroBannner />
            :
            <h2>Room Reservation</h2>
            }
            <Search />
            <IndexPlaceholder />
        </div>
    )
}
