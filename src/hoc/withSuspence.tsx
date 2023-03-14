import React, {Suspense} from 'react';
import {Preloader} from "../components/common/Preloader/Preloader";


export const WithSuspence = (children: Element) => {
    return <Suspense fallback={<Preloader/>}>
        {children}
    </Suspense>

};