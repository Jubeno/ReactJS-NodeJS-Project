import React, { useState } from 'react';
import { connect } from "react-redux";
import Navigation from '../../library/common/components/Navigation';
import BaseLayout from '../../library/common/hoc/BaseLayout';
import { getUserId } from '../../library/utilities/util/retrieve';



const Home = (props) => {
    const { Home } = props;

    const userId = getUserId();
    console.log('%c  userId:', 'color: #0e93e0;background: #aaefe5;', userId);



    return (
        <>
            {/* <Navigation activeKey={'/homepage'}/> */}
            
        </>
    );
}

const mapStateToProps = state => {
    return {
        Home: state.Home,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)