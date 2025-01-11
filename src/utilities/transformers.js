export const getTransformedCountryOptions = (country = []) => {
  const allCountrys = country?.map(item => ({
    value: item?.id,
    label: item?.common_name,
  }));

  return allCountrys || [];
};
export const getTransformedTimeZoneOptions = (timeZone = []) => {
  const allCountrytimeZone = timeZone?.map(item => ({
    value: item?.id,
    label: item?.timezone,
  }));

  return allCountrytimeZone || [];
};
export const getAllServicesOptions = (services = []) => {
  const allServices = services?.map(item => ({
    value: item?.id,
    label: item?.name,
    price: item?.price,
  }));

  return allServices || [];
};

export const transformToFormData = values => {
  const formData = new FormData();
  Object.entries(values).forEach(([key]) => {
    if (key !== 'company_images' && key !== 'company_staff' && key !== 'email' && key !== 'image') {
      formData.append(`${key}`, values[key]);
    }
  });

  if (values?.email) {
    formData.append('email', values?.email);
  }

  if (values?.company_staff) {
    formData.append('company_staff', values?.company_staff);
  }

  if (values?.image && typeof values?.image !== 'string') {
    formData.append('image', values?.image, values?.image?.name);
  }

  // Append Images array
  if (values?.company_images) {
    const hasCompany = values.company_images.some(image => image.company !== undefined);
    if (!hasCompany) {
      values?.company_images?.forEach((image, index) => {
        formData.append(`company_images[${index}]image`, image);
      });
    }
  }

  // Append Cities array
  if (values?.company_staff) {
    values?.company_staff?.forEach((staff, index) => {
      formData.append(`company_staff[${index}]staff_member`, staff);
    });
  }

  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  return formData;
};

export const showFormData = formData => {
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  return formDataObject;
};
