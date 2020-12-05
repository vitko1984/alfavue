import * as mock from '@/lib/mock/MockData';
import BaseController from '@/lib/mock/controllers/BaseController';

class PriceController extends BaseController {
    getPath () {
        return '/prices'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getPrices({...vars, ...params})
                }
            },
            /* {
                path: '/:appointmentId',
                handler: (vars, params) => {
                    return mock.getAppointmentDetails({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getAppointmentCount({...vars, ...params})
                }
            }, */
        ]
    }
}

export default new PriceController()