import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'Dermatologist',
        image: General_physician
    },
    {
        speciality: 'Oncologist',
        image: Gynecologist
    },
    {
        speciality: 'Cardiologist',
        image: Dermatologist
    },
    {
        speciality: 'Otolaryngologist',
        image: Pediatricians
    },
    {
        speciality: 'Trichologist',
        image: Neurologist
    },
    {
        speciality: 'Nephrologist',
        image: Gastroenterologist
    },
]
export const TestData = [
    {
        speciality: 'Skin',
        image: General_physician
    },
    {
        speciality: 'Cancer',
        image: Gynecologist
    },
    {
        speciality: 'Cardio',
        image: Dermatologist
    },
    {
        speciality: 'ENT',
        image: Pediatricians
    },
    {
        speciality: 'Hair',
        image: Neurologist
    },
    {
        speciality: 'Kidney',
        image: Gastroenterologist
    },
]
export const tests = [
  {
    "_id": "Skin1",
    "name": "Skin Biopsy",
    "disease_type": "Dermatology",
    "disease_cat": "Skin",
    "description": "A Skin Biopsy is a crucial diagnostic procedure in dermatology where a small sample of skin tissue is carefully removed for analysis. This specimen is then sent to a laboratory for detailed microscopic examination by a pathologist. The test is fundamental for accurately diagnosing various conditions, including skin cancers like melanoma, persistent rashes, infections, and inflammatory disorders. The procedure is typically performed under local anesthesia to ensure minimal discomfort. It provides definitive answers that visual examination alone cannot, guiding dermatologists in formulating the most effective treatment plan for the patient's specific condition.",
    "price": "₹2,500"
  },
  {
    "_id": "Skin2",
    "name": "Patch Test",
    "disease_type": "Dermatology",
    "disease_cat": "Skin",
    "description": "A Patch Test is the gold standard for identifying contact dermatitis triggers, which cause allergic reactions upon skin contact. During this test, small patches containing tiny amounts of common allergens like metals, fragrances, or preservatives are applied to the skin, typically on the back. These patches remain in place for about 48 hours and are then removed to observe any reactions. It is a safe and controlled method to pinpoint the specific substances causing your skin irritation. Understanding these triggers is essential for managing symptoms and avoiding future allergic flare-ups effectively.",
    "price": "₹1,500"
  },
  {
    "_id": "Skin3",
    "name": "Dermoscopy",
    "disease_type": "Dermatology",
    "disease_cat": "Skin",
    "description": "Dermoscopy is a non-invasive diagnostic technique that allows for an in-depth, magnified examination of skin lesions. Using a handheld instrument called a dermatoscope, a dermatologist can visualize subsurface skin structures that are not visible to the naked eye. This is particularly vital for the early detection of skin cancers, especially melanoma, by distinguishing between benign and malignant growths with greater accuracy. The procedure is quick, painless, and provides immediate insights, helping to reduce unnecessary biopsies and enabling prompt treatment when required.",
    "price": "₹1,200"
  },
  {
    "_id": "Cancer1",
    "name": "Cancer Biopsy",
    "disease_type": "Oncology",
    "disease_cat": "Cancer",
    "description": "A Cancer Biopsy is the definitive procedure for diagnosing most types of cancer. It involves the surgical removal of a small tissue sample from a suspected tumor or abnormal area. This sample is then meticulously analyzed under a microscope by a pathologist to check for the presence of cancer cells. Beyond just confirming a diagnosis, a biopsy helps determine the specific type of cancer and its grade, which indicates how aggressive it is. This information is absolutely critical for oncologists to develop a precise and effective treatment strategy tailored to the individual patient.",
    "price": "₹5,000"
  },
  {
    "_id": "Cancer2",
    "name": "Cancer Imaging (CT/MRI)",
    "disease_type": "Oncology",
    "disease_cat": "Cancer",
    "description": "Advanced imaging tests like Computed Tomography (CT) and Magnetic Resonance Imaging (MRI) are cornerstones of modern oncology. These non-invasive scans create detailed, cross-sectional images of the inside of the body. They are essential for visualizing tumors, determining their exact size and location, and assessing whether cancer has spread to other areas (metastasized). Oncologists rely heavily on these scans for cancer staging, planning treatments such as surgery or radiation, and for monitoring how well a patient is responding to ongoing therapy over time.",
    "price": "₹7,000"
  },
  {
    "_id": "Cancer3",
    "name": "Tumor Marker Test",
    "disease_type": "Oncology",
    "disease_cat": "Cancer",
    "description": "A Tumor Marker Test is a blood test used to detect specific substances, often proteins, that are produced by cancer cells or by the body in response to cancer. While not typically used for initial diagnosis on their own, these markers are invaluable for several other purposes. They can help in determining a patient's prognosis, assessing the stage of the cancer, and, most importantly, monitoring the effectiveness of treatment. A decrease in a tumor marker level can indicate that the treatment is working, while an increase might suggest a recurrence or progression of the disease.",
    "price": "₹3,000"
  },
  {
    "_id": "Cardio1",
    "name": "Electrocardiogram (ECG)",
    "disease_type": "Cardiology",
    "disease_cat": "Cardio",
    "description": "An Electrocardiogram (ECG) is a fundamental, non-invasive test in cardiology that records the electrical signals generated by the heart. Electrodes are placed on the chest, arms, and legs to capture this activity, which is then displayed as a wave pattern. The test is quick, painless, and provides immediate information about the heart's rate and rhythm. It is highly effective for detecting arrhythmias (irregular heartbeats), evidence of a previous heart attack, or signs of coronary artery disease. An ECG is often the first test performed for patients experiencing chest pain or palpitations.",
    "price": "₹800"
  },
  {
    "_id": "Cardio2",
    "name": "Echocardiography (Echo)",
    "disease_type": "Cardiology",
    "disease_cat": "Cardio",
    "description": "Echocardiography, or an 'Echo', is an ultrasound test that creates detailed, real-time images of the heart. A transducer is placed on the chest, which emits sound waves that bounce off the heart's structures, creating moving pictures. This allows cardiologists to assess the heart's size, shape, and pumping efficiency with great detail. It is excellent for diagnosing structural problems such as valve disorders, heart muscle damage after a heart attack, and congenital heart defects. The test is non-invasive and provides a comprehensive evaluation of overall cardiac function.",
    "price": "₹2,200"
  },
  {
    "_id": "Cardio3",
    "name": "Coronary Angiography",
    "disease_type": "Cardiology",
    "disease_cat": "Cardio",
    "description": "Coronary Angiography is a specialized imaging procedure used to visualize the blood vessels of the heart. A thin, flexible tube called a catheter is inserted into an artery, usually in the wrist or groin, and guided to the heart. A special contrast dye is then injected, and X-ray images are taken. This allows cardiologists to see the exact location and severity of any blockages or narrowing in the coronary arteries. It is the definitive test for diagnosing coronary artery disease and is crucial for planning interventions like angioplasty or bypass surgery.",
    "price": "₹12,000"
  },
  {
    "_id": "Ent1",
    "name": "Audiometry",
    "disease_type": "Otolaryngology",
    "disease_cat": "ENT",
    "description": "Audiometry is a comprehensive hearing test conducted by an audiologist to evaluate a person's hearing ability. The test measures the softest sounds one can hear at different pitches, or frequencies. The patient wears headphones and responds to a series of tones played at varying intensities. The results are plotted on an audiogram, which provides a detailed map of the individual's hearing loss pattern. This evaluation is essential for diagnosing the type and degree of hearing loss, helping to determine the underlying cause and guide recommendations for hearing aids or other treatments.",
    "price": "₹1,000"
  },
  {
    "_id": "Ent2",
    "name": "Nasal Endoscopy",
    "disease_type": "Otolaryngology",
    "disease_cat": "ENT",
    "description": "Nasal Endoscopy is a diagnostic procedure performed by an ENT specialist to get a clear, detailed view of the nasal and sinus passages. A thin, flexible or rigid tube with a tiny camera and light at its end, called an endoscope, is gently inserted into the nostril. This allows the doctor to examine the internal structures of the nose and throat for inflammation, polyps, tumors, or sources of bleeding. It is a key tool for diagnosing chronic sinusitis, nasal blockages, and other nasal disorders, providing much more detail than a standard physical examination.",
    "price": "₹3,500"
  },
  {
    "_id": "Hair1",
    "name": "Trichoscopy",
    "disease_type": "Trichology",
    "disease_cat": "Hair",
    "description": "Trichoscopy is a specialized, non-invasive method for examining the hair and scalp under high magnification. It utilizes a dermatoscope to provide a detailed view of hair shafts, follicles, and surrounding scalp skin. This technique allows a trichologist or dermatologist to identify specific patterns and abnormalities associated with different types of hair loss, such as androgenetic alopecia or alopecia areata. It aids in differentiating between various scalp disorders, assessing their severity, and monitoring the patient's response to treatment over time without needing a biopsy.",
    "price": "₹1,500"
  },
  {
    "_id": "Hair2",
    "name": "Hair-related Blood Tests",
    "disease_type": "Trichology",
    "disease_cat": "Hair",
    "description": "Hair-related blood tests are essential for investigating the underlying systemic causes of hair loss and scalp issues. These tests typically analyze levels of key nutrients and hormones that are vital for healthy hair growth. Common panels check for iron deficiency (ferritin), vitamin D levels, thyroid function (TSH), and hormonal imbalances. Identifying and correcting these deficiencies or imbalances can be a critical step in treating conditions like telogen effluvium (diffuse shedding) and can significantly improve the efficacy of other hair loss treatments.",
    "price": "₹2,000"
  },
  {
    "_id": "Kidney1",
    "name": "Kidney Function Test (KFT)",
    "disease_type": "Nephrology",
    "disease_cat": "Kidney",
    "description": "A Kidney Function Test (KFT) is a panel of blood tests designed to evaluate how well the kidneys are working. It primarily measures levels of waste products like creatinine and urea in the blood; higher levels can indicate that the kidneys are not filtering waste effectively. The test also assesses electrolytes such as sodium and potassium, which are regulated by the kidneys. KFT is crucial for the early detection and monitoring of chronic kidney disease, especially in patients with diabetes or high blood pressure, allowing for timely intervention to preserve kidney function.",
    "price": "₹1,200"
  },
  {
    "_id": "Kidney2",
    "name": "Renal Ultrasound",
    "disease_type": "Nephrology",
    "disease_cat": "Kidney",
    "description": "A Renal Ultrasound is a non-invasive imaging test that uses high-frequency sound waves to produce detailed pictures of the kidneys, ureters, and bladder. This safe and painless procedure can help doctors assess the size and shape of the kidneys and detect structural abnormalities. It is highly effective for identifying kidney stones, cysts, tumors, and signs of blockage or swelling in the urinary tract. A renal ultrasound provides valuable information for diagnosing the cause of kidney pain, blood in the urine, or recurrent urinary tract infections.",
    "price": "₹2,800"
  }
];


export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Ramesh Sharma',
        image: doc1,
        speciality: 'Cardiologist',
        degree: 'MBBS',
        experience: '12 Years',
        about: 'Dr. Ramesh Sharma is an experienced cardiologist who has treated thousands of patients with heart diseases, hypertension, and cholesterol issues. He strongly believes in preventive cardiology and educates his patients about lifestyle modifications, diet, and exercise along with medical management.',
        fees: 800,
        address: {
            line1: '12 MG Road',
            line2: 'Indiranagar, Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Anjali Mehta',
        image: doc2,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Dr. Anjali Mehta specializes in clinical and cosmetic dermatology. She provides treatments for acne, eczema, pigmentation, and psoriasis while also offering advanced cosmetic procedures. Her patients appreciate her patient-friendly approach and focus on long-term skin health.',
        fees: 600,
        address: {
            line1: '21 Ring Road',
            line2: 'Lajpat Nagar, New Delhi'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Suresh Iyer',
        image: doc3,
        speciality: 'Oncologist',
        degree: 'MBBS',
        experience: '10 Years',
        about: 'Dr. Suresh Iyer is a compassionate oncologist who has expertise in diagnosing and managing cancers of various types. He has guided patients through chemotherapy, immunotherapy, and palliative care, always ensuring emotional and psychological support alongside medical treatment.',
        fees: 1000,
        address: {
            line1: '34 Residency Road',
            line2: 'T. Nagar, Chennai, Tamil Nadu'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Rohit Gupta',
        image: doc4,
        speciality: 'Otolaryngologist',
        degree: 'MBBS',
        experience: '9 Years',
        about: 'Dr. Rohit Gupta is an ENT specialist focusing on ear infections, chronic sinusitis, throat conditions, and hearing disorders. She is skilled in both medical and surgical treatments and ensures her patients regain comfort and confidence in their daily lives.',
        fees: 650,
        address: {
            line1: '56 SG Highway',
            line2: 'Satellite, Ahmedabad, Gujarat'
        }
    },
    {
        _id: 'doc5',
        name: ' Dr. Kavita Nair',
        image: doc5,
        speciality: 'Trichologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Kavita Nair specializes in hair loss, scalp disorders, and non-surgical hair restoration.Her holistic approach includes medical treatments, lifestyle advice, and nutritional support, making her a trusted doctor for patients seeking healthy and long-lasting hair solutions.',
        fees: 550,
        address: {
            line1: '78 Civil Lines',
            line2: 'Connaught Place, New Delhi'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Rajesh Gupta',
        image: doc6,
        speciality: 'Nephrologist',
        degree: 'MBBS',
        experience: '11 Years',
        about: 'Dr. Rajesh Gupta has deep expertise in managing kidney diseases, dialysis care, and transplant patients. He focuses on improving quality of life for individuals with chronic kidney disease and educates families about preventive steps and long-term care.',
        fees: 900,
        address: {
            line1: '45 Banjara Hills',
            line2: 'Jubilee Hills, Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Arvind Kumar',
        image: doc7,
        speciality: 'Cardiologist',
        degree: 'MBBS',
        experience: '14 Years',
        about: 'Dr. Arvind Kumar has extensive experience in interventional cardiology including angioplasty and stent procedures. He is known for his calm demeanor and clear explanations that help patients and families understand complex heart conditions with ease.',
        fees: 1200,
        address: {
            line1: '67 Park Street',
            line2: 'Ballygunge, Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Manish Kapoor',
        image: doc8,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Manish Kapoor has a special interest in cosmetic dermatology and anti-aging treatments. He helps his patients achieve healthy and glowing skin using evidence-based therapies combined with lifestyle guidance.',
        fees: 700,
        address: {
            line1: '89 Jubilee Hills',
            line2: 'Banjara Hills, Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Sneha Reddy',
        image: doc9,
        speciality: 'Oncologist',
        degree: 'MBBS',
        experience: '12 Years',
        about: 'Dr. Sneha Reddy is a senior oncologist experienced in managing complex cancer cases. She is a strong advocate for early screening and timely treatment and has successfully guided numerous patients through advanced therapies.',
        fees: 1200,
        address: {
            line1: '23 Sector 18',
            line2: 'Noida, Uttar Pradesh'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Vivek Singh',
        image: doc10,
        speciality: 'Otolaryngologist',
        degree: 'MBBS',
        experience: '8 Years',
        about: 'Dr. Vivek Singh is an ENT expert with a focus on voice disorders, nasal allergies, and endoscopic sinus surgery. His patient-first approach and precise diagnosis make his a trusted doctor in his field.',
        fees: 650,
        address: {
            line1: '78 FC Road',
            line2: 'Shivajinagar, Pune, Maharashtra'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Shalini Joshi',
        image: doc11,
        speciality: 'Trichologist',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Dr. Shalini Joshi focuses on advanced trichology treatments such as PRP therapy and stem cell therapy for hair restoration. She provides long-term solutions for dandruff, alopecia, and scalp health issues.',
        fees: 600,
        address: {
            line1: '14 Ashok Nagar',
            line2: 'Anna Salai, Chennai, Tamil Nadu'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Sanjay Bhatia',
        image: doc12,
        speciality: 'Nephrologist',
        degree: 'MBBS',
        experience: '13 Years',
        about: 'Dr. Sanjay Bhatia is a senior nephrologist with a focus on kidney transplant management and critical care nephrology. He is highly regarded for his personalized patient care and detailed follow-ups.',
        fees: 950,
        address: {
            line1: '90 Camp Road',
            line2: 'Hadapsar, Pune, Maharashtra'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Meera Deshmukh',
        image: doc13,
        speciality: 'Cardiologist',
        degree: 'MBBS',
        experience: '9 Years',
        about: 'Dr. Meera Deshmukh is a cardiologist who emphasizes preventive heart care and community health awareness. She regularly organizes health camps and has helped many patients adopt heart-healthy lifestyles.',
        fees: 700,
        address: {
            line1: '45 Nehru Place',
            line2: 'South Extension, New Delhi'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Akash Malhotra',
        image: doc14,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Akash Malhotra specializes in pediatric dermatology and is particularly skilled in treating skin issues in children such as eczema and allergies. He also advises on skin care for sensitive skin types.',
        fees: 650,
        address: {
            line1: '34 Park Avenue',
            line2: 'Salt Lake, Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Pooja Sinha',
        image: doc15,
        speciality: 'Oncologist',
        degree: 'MBBS',
        experience: '15 Years',
        about: 'Dr. Pooja Sinha is a leading oncologist with extensive experience in both medical and radiation oncology. She is committed to research-driven treatments and provides strong emotional support for patients and families.',
        fees: 1300,
        address: {
            line1: '22 Civil Lines',
            line2: 'Lucknow, Uttar Pradesh'
        }
    }
]


