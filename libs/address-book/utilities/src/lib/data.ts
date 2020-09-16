export const genders = [
    "Other",
    "Male",
    "Female"
];

export const validationMessages = {
    'firstname': [
        { type: 'required', message: 'Firstname is required' },
        { type: 'minlength', message: 'Firstname must be at least 2 characters long' },
        { type: 'maxlength', message: 'Firstname cannot be more than 20 characters long' },
        { type: 'pattern', message: 'Your firstname must contain only letters' }
    ],
    'lastname': [
        { type: 'required', message: 'Lastname is required' },
        { type: 'minlength', message: 'Lastname must be at least 2 characters long' },
        { type: 'maxlength', message: 'Lastname cannot be more than 20 characters long' },
        { type: 'pattern', message: 'Your lastname must contain only letters' }
    ],
    'gender': [
        { type: 'required', message: 'Please select your gender' },
    ],
    'birthday': [
        { type: 'required', message: 'Please insert your birthday' },
    ],
    'street': [
        { type: 'required', message: 'Street-name is required' },
        { type: 'minlength', message: 'Must be at least 5 characters long' },
        { type: 'maxlength', message: 'Cannot be more than 20 characters long' },
        { type: 'pattern', message: 'Must contain only letters' }
    ],
    'number': [
        { type: 'required', message: 'House number is required' },
        { type: 'pattern', message: 'Must contain only positive numbers' }
    ],
    'postcode': [
        { type: 'required', message: 'Postcode is required' },
        { type: 'minlength', message: 'Must be a 5-digit number' },
        { type: 'maxlength', message: 'Must be a 5-digit number' },
        { type: 'pattern', message: 'Must contain only numbers' },
        { type: 'notFound', message: 'Postcode not found' }
    ],
    'city': [
        { type: 'required', message: 'City is required' }
    ]
}

export const DateFormats = {
    parse: {
        dateInput: ['DD.MM.YYYY']
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};