export const formatHcpcsModifiers = (hcpcsModifiers: string) => {
  return hcpcsModifiers.replace(/\s/g, '').split(',');
};

export const getHcpcsDescription = (code: string) => {
  console.log('getHcpcsDescription ~ code:', code);
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
    { code: 'LT', description: 'Left Side' },
    { code: 'RT', description: 'Right Side' },
    { code: 'KF', description: 'Item designated by FDA as class III device' },
    { code: 'JB', description: 'Administered Subcutaneously' },
    {
      code: 'JK',
      description: 'One month supply or less of drug or biological',
    },
    { code: 'JL', description: 'Three month supply of drug or biological' },
    {
      code: 'JW',
      description: 'Drug amount discarded/not administered to any patient',
    },
    {
      code: 'JZ',
      description: 'Zero drug amount discarded/not administered to any patient',
    },
    {
      code: 'KM',
      description:
        'Replacement of facial prosthesis including new impression/moulage',
    },
    {
      code: 'KN',
      description:
        'Replacement of facial prosthesis using previous master model',
    },
    {
      code: 'KS',
      description:
        'Glucose monitor supply for diabetic beneficiary not treated by insulin',
    },
    {
      code: 'AV',
      description:
        'Item furnished in conjunction with a prosthetic device, prosthetic or orthotic',
    },
    { code: 'CG', description: 'Policy criteria applied' },
    {
      code: 'GK',
      description:
        'Reasonable and necessary item/service associated with a GA or GZ modifier',
    },
    {
      code: 'GL',
      description:
        'Medically unnecessary upgrade provided instead of non-upgraded item, no charge, no ABN',
    },
    {
      code: 'K0',
      description:
        'Lower limb extremity prosthesis functional Level 0 - Does not have the ability or potential to ambulate or transfer safely with or without assistance and a prosthesis does not enhance their quality of life or mobility',
    },
    {
      code: 'K1',
      description:
        'Lower extremity prosthesis functional Level 1 - Has the ability or potential to use a prosthesis for transfers or ambulation on level surfaces at fixed cadence. Typical of the limited and unlimited household ambulator.',
    },
    {
      code: 'K2',
      description:
        'Lower extremity prosthesis functional Level 2 - Has the ability or potential for ambulation with the ability to traverse low level environmental barriers such as curbs, stairs, or uneven surfaces. Typical of the limited community ambulator.',
    },
    {
      code: 'K3',
      description:
        'Lower extremity prosthesis functional Level 3 - Has the ability or potential for ambulation with variable cadence. Typical of the community ambulator who has the ability to traverse most environmental barriers and may have vocational, therapeutic, or exercise activity that demands prosthetic utilization beyond simple locomotion.',
    },
    {
      code: 'K4',
      description:
        'Lower extremity prosthesis functional Level 4 - Has the ability or potential for prosthetic ambulation that exceeds basic ambulation skills, exhibiting high impact, stress, or energy levels. Typical of the prosthetic demands of the child, active adult, or athlete.',
    },
    { code: 'KO', description: 'Single drug unit dose formulation' },
    {
      code: 'KP',
      description: 'First drug of a multiple drug unit dose formulation',
    },
    {
      code: 'KQ',
      description:
        'Second or subsequent drug of a multiple drug unit dose formulation',
    },
    {
      code: 'AU',
      description:
        'Item furnished in conjunction with a urological, ostomy or tracheostomy supply.',
    },
    { code: 'N1', description: 'Group 1 oxygen coverage criteria met' },
    { code: 'N2', description: 'Group 2 oxygen coverage criteria met' },
    { code: 'N3', description: 'Group 3 oxygen coverage criteria met' },
    {
      code: 'QA',
      description:
        'Prescribed amounts of stationary oxygen for daytime use while at rest and nighttime use differ and the average of the two amounts is less than 1 liter per minute (LPM)',
    },
    {
      code: 'QB',
      description:
        'Prescribed amounts of stationary oxygen for daytime use while at rest and nighttime use differ and the average of the two amounts exceeds 4 liters per minute (LPM) and portable oxygen is prescribed',
    },
    {
      code: 'QE',
      description:
        'Prescribed amount of stationary oxygen while at rest is less than 1 liter per minute (LPM)',
    },
    {
      code: 'QF',
      description:
        'Prescribed amount of stationary oxygen while at rest exceeds 4 liters per minute (LPM) and portable oxygen is prescribed',
    },
    {
      code: 'QG',
      description:
        'Prescribed amount of stationary oxygen while at rest is greater than 4 liters per minute (LPM)',
    },
    {
      code: 'QH',
      description:
        'Oxygen conserving device is being used with an oxygen delivery system',
    },
    {
      code: 'QR',
      description:
        'Prescribed amounts of stationary oxygen for daytime use while at rest and nighttime use differ and the average of the two amounts is greater than 4 liters per minute (LPM)',
    },
    { code: 'RA', description: 'Replacement of a DME item' },
    { code: 'A1', description: 'Dressing for one wound' },
    { code: 'A2', description: 'Dressing for two wounds' },
    { code: 'A3', description: 'Dressing for three wounds' },
    { code: 'A4', description: 'Dressing for four wounds' },
    { code: 'A5', description: 'Dressing for five wounds' },
    { code: 'A6', description: 'Dressing for six wounds' },
    { code: 'A7', description: 'Dressing for seven wounds' },
    { code: 'A8', description: 'Dressing for eight wounds' },
    { code: 'A9', description: 'Dressing for nine or more wounds' },
    {
      code: 'AW',
      description: 'Item furnished in conjunction with a surgical dressing',
    },
  ];

  return hcpsDescriptions.find((hcpcs) => hcpcs.code === code)?.description;
};
