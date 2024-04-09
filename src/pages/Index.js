import Search from '../features/search/Search';
import HeroBannner from '../ui/HeroBanner'

export default function Index() {
    const hasBanner = true;

    return (
        <div className={`${hasBanner ? 'portlet_has_banner' : ''}`}>
            {hasBanner &&
                <HeroBannner />
            }
            <Search />
        </div>
    )
}
