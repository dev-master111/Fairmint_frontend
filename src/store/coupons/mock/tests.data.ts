import axios           from 'axios';
import {AxiosInstance} from 'axios';
import {AxiosResponse} from 'axios';
import MockAdapter     from 'axios-mock-adapter';


import apiSearchCouponsResponse from './search-coupons-response.json';

// const couponCode: string = 'FREETEMPTA';
// const couponCode: string = '10PERCENT';
const couponCode: string = '5DOLLAR';

function mockNetWorkResponse(customAxios?: AxiosInstance): MockAdapter {
    const mock = new MockAdapter(customAxios || axios);

    mock.onGet(/\/api\/coupons\/([\w|-]+)$/).reply(200, apiSearchCouponsResponse);

    return mock;
}

function sendApiRequest(
    config: any,
    apiClient: AxiosInstance,
    action: (apiClient: AxiosInstance) => Promise<AxiosResponse<any, any>>
): Promise<AxiosResponse<any, any>> {
    // Wrap the axios instance in a MockAdapter (if using mock data)
    let mock = config.api.USE_MOCK_DATA
        ? mockNetWorkResponse(apiClient)
        : null
    ;
    try {
        return action(apiClient);
    }
    finally {
        if (mock) {
            // Remove mock adapter from axios instance
            mock.restore();
        }
    }
}

export {
    mockNetWorkResponse,
    // --
    sendApiRequest,
    // --
    couponCode,
    apiSearchCouponsResponse
};