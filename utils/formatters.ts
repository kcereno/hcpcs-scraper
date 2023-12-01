export const formatHcpcsModifiers = (hcpcsModifiers: string) => {
  return hcpcsModifiers.replace(/\s/g, '').split(',');
};

export const getHcpcsDescription = (code: string) => {
  console.log('getHcpcsDescriptions ~ code:', code);
  const hcpsDescriptions: { code: string; description: string }[] = [
    {
      code: 'BA',
      description:
        'Item furnished in conjunction with parenteral enteral nutrition (PEN) services',
    },
    {
      code: 'BO',
      description: 'Orally administered nutrition, not by feeding tube',
    },
    {
      code: 'EY',
      description:
        'No physician or other licensed health care provider order for this item or service',
    },
    {
      code: 'GA',
      description:
        'Waiver of liability statement issued as required by payer policy, individual case',
    },
    {
      code: 'GY',
      description:
        'Item or service statutorily excluded or does not meet the definition of any Medicare benefit',
    },
    {
      code: 'GZ',
      description:
        'Item or service expected to be denied as not reasonable and necessary',
    },
    {
      code: 'KX',
      description: 'Requirements specified in the medical policy have been met',
    },
  ];

  return hcpsDescriptions.find((hcpcs) => hcpcs.code === code)?.description;
};
