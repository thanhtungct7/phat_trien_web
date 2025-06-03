import React, { useState, useEffect } from "react";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

const CameraPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header variant="default" />
            <h1>Camera</h1>
            <Footer variant="compact" />
        </div>
    )
}

export default CameraPage;