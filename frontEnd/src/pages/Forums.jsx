import Comments from "../components/comments/Comments";
import PageHeader from '../components/page-header/PageHeader';

const Forums = () => {
    return (
    <>
    <PageHeader />
            <div className="comments__header"><h1>Discussion Forum</h1></div>
            <div className="content-wrapper">
                <Comments commentsUrl="http://localhost:3004/comments" currentUserId="1" />
            </div>
    </>
  );
};

export default Forums;
