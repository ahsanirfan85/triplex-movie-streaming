import React from 'react';
import Forum from "../components/Forum"
import PageHeader from '../components/page-header/PageHeader';


const Forums = () => {
    return (
        <>
        <PageHeader />
            <h1 className='forums__title'>DISCUSSION FORUM</h1>
            <div className="forums-container">
                <div className="forums">
                    <Forum />

                </div>
            </div>
        </>
    );
}

export default Forums