import {agent as _request} from 'supertest'

import {get as application} from "./../src/app"

export const request = _request(application())