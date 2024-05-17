import { z } from 'zod';

export const userSchema = z.object({
  RegdNo: z.string().min(1),
  rollno: z.string().min(1),
 
  Academics: z.object({
    Matriculation: z.object({
      percentage: z.number(),
      institution: z.string(),
      PassingYear: z.number(),
    }),
    UG: z.object({
      percentage: z.number(),
      paper: z.string(),
      institution: z.string(),
      PassingYear: z.number(),
    }),
    Diploma: z.object({
      percentage: z.number(),
      paper: z.string(),
      institution: z.string(),
      PassingYear: z.number(),
    }),
    BCA: z.object({
      percentage: z.number(),
      institution: z.string(),
      PassingYear: z.number(),
    }),
    Class12: z.object({
      percentage: z.number(),
      institution: z.string(),
      PassingYear: z.number(),
    }),
    MCA: z.object({
      percentage: z.number(),
      institution: z.string(),
      PassingYear: z.number(),
    }),
  }),
  Batch: z.string().min(1, "Batch is required."),
  personalDetails: z.object({
    FirstName: z.string().min(1, "First Name is required."),
    LastName: z.string().min(1, "Last Name is required."),
    MiddleName: z.string(),
    Gender: z.string().min(1, "Gender is required."),
    Nationality: z.string(),
    Caste: z.string().min(1, "Caste is required."),
    DOB: z.string().min(1, "Date of Birth is required."),
    Religion: z.string().min(1, "Religion is required."),
    Bloodgrp: z.string().min(1, "Blood Group is required."),
    hostel: z.string().min(1, "Hostel status is required."),
    transport: z.string().min(1, "Transport status is required."),
    Lunch: z.string().min(1, "Lunch status is required."),
  }),
  PhoneNo: z.string().min(1),
  whatsappNo: z.string(),
  Course: z.string().min(1),
  Department: z.string().min(1),
  Section: z.string().min(1),

  Guardian: z.object({
    name: z.string().min(1),
    relation: z.string().min(1),
    phoneNo: z.string().min(1),
    address: z.string().min(1),
    profession: z.string(),
  }),
  address: z.object({
    houseNo: z.string().min(1),
    district: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    pincode: z.string().min(1),
  }),
  permanentAddress: z.object({
    houseNo: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    pincode: z.string().min(1),
  }),
  mentor: z.string().nullable(),
 
});
