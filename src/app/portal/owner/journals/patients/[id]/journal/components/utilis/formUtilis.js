import * as Yup from 'yup';

export const initialValues = {
    date: "", // Date field, required
    booking: null, // Optional integer field
    kvy_code: [], // Required array of integers with unique items
    diagnosis: [], // Required array of integers with unique items
    contact_name: "", // Optional string with maxLength: 255
    assessment: "", // Optional string
    action: "", // Optional string
    description: "", // Optional string
    phone: "", // Optional string with maxLength: 20
    price: "", // Decimal value as a string
    journal_files: [
      {
        is_active: true, // Default value for is_active
      },
    ], // Array of JournalFiles objects
  };

  export const test = ''