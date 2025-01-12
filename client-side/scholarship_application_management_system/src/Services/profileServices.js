import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const getProfileByUserID = async (user_id) => {

    try {
        const result = await axios.get(`${BASE_URL}/profiles/getProfileByUserID/${user_id}`,)

        if (result) {
            console.log('Successfully get profile details.')
            return result.data
        }
        
    } catch (error) {
        console.log('Server error:', error)
        return null
    }
}

export const addProfile = async (data) => {
    try {
        
        const formData = new FormData();

        // Append personal information
        formData.append('user_id', data.user_id || '');
        formData.append('program_id', data.program_id || '');
        formData.append('email', data.email || '');
        formData.append('firstname', data.firstname || '');
        formData.append('middlename', data.middlename || '');
        formData.append('lastname', data.lastname || '');
        formData.append('birthdate', data.birthdate || '');
        formData.append('gender', data.gender || '');
        formData.append('civil_status', data.civil_status || '');
        formData.append('current_address', data.current_address || '');
        formData.append('permanent_address', data.permanent_address || '');
        formData.append('contact', data.contact || '');

        // Append primary school information
        formData.append('primary_school_name', data.primary_school_name || '');
        formData.append('primary_school_address', data.primary_school_address || '');
        formData.append('primary_school_year_attended', data.primary_school_year_attended || '');

        // Append secondary school information
        formData.append('secondary_school_name', data.secondary_school_name || '');
        formData.append('secondary_school_address', data.secondary_school_address || '');
        formData.append('secondary_school_year_attended', data.secondary_school_year_attended || '');

        // Append mother information
        formData.append('mother_firstname', data.mother_firstname || '');
        formData.append('mother_middlename', data.mother_middlename || '');
        formData.append('mother_lastname', data.mother_lastname || '');
        formData.append('mother_current_address', data.mother_current_address || '');
        formData.append('mother_permanent_address', data.mother_permanent_address || '');
        formData.append('mother_contact_number', data.mother_contact_number || '');
        formData.append('mother_registered_voter', data.mother_registered_voter ? 'true' : 'false');
        formData.append('mother_voting_years', data.mother_voting_years || 0);

        // Append father information
        formData.append('father_firstname', data.father_firstname || '');
        formData.append('father_middlename', data.father_middlename || '');
        formData.append('father_lastname', data.father_lastname || '');
        formData.append('father_current_address', data.father_current_address || '');
        formData.append('father_permanent_address', data.father_permanent_address || '');
        formData.append('father_contact_number', data.father_contact_number || '');
        formData.append('father_registered_voter', data.father_registered_voter ? 'true' : 'false');
        formData.append('father_voting_years', data.father_voting_years || 0);

        // Append files
        if (data.coe_file) formData.append('coe_file', data.coe_file);
        if (data.brgy_indigency) formData.append('brgy_indigency', data.brgy_indigency);
        if (data.cog_file) formData.append('cog_file', data.cog_file);
        if (data.school_id) formData.append('school_id', data.school_id);
        if (data.parent_id) formData.append('parent_id', data.parent_id);
        if (data.certificate_of_registration_comelec) {
            formData.append('certificate_of_registration_comelec', data.certificate_of_registration_comelec);
        }

        // Append profile picture
        formData.append('profile_picture', data.profile_picture || 'default');

        const result = await axios.post(`${BASE_URL}/accounts/addProfiles`, formData);

        if (result) {
            console.log('Successfully added profile.');
            return result.data;
        }
    } catch (error) {
        console.error('Error in server:', error);
        return null;
    }
};

export const updateProfile = async (data) => {
    
    try {
        
        const formData = new FormData();

        // Append personal information
        formData.append('user_id', data.user_id || '');
        formData.append('program_id', data.program_id || '');
        formData.append('email', data.email || '');
        formData.append('firstname', data.firstname || '');
        formData.append('middlename', data.middlename || '');
        formData.append('lastname', data.lastname || '');
        formData.append('birthdate', data.birthdate || '');
        formData.append('gender', data.gender || '');
        formData.append('civil_status', data.civil_status || '');
        formData.append('current_address', data.current_address || '');
        formData.append('permanent_address', data.permanent_address || '');
        formData.append('contact', data.contact || '');

        // Append primary school information
        formData.append('primary_school_name', data.primary_school_name || '');
        formData.append('primary_school_address', data.primary_school_address || '');
        formData.append('primary_school_year_attended', data.primary_school_year_attended || '');

        // Append secondary school information
        formData.append('secondary_school_name', data.secondary_school_name || '');
        formData.append('secondary_school_address', data.secondary_school_address || '');
        formData.append('secondary_school_year_attended', data.secondary_school_year_attended || '');

        // Append mother information
        formData.append('mother_firstname', data.mother_firstname || '');
        formData.append('mother_middlename', data.mother_middlename || '');
        formData.append('mother_lastname', data.mother_lastname || '');
        formData.append('mother_current_address', data.mother_current_address || '');
        formData.append('mother_permanent_address', data.mother_permanent_address || '');
        formData.append('mother_contact_number', data.mother_contact_number || '');
        formData.append('mother_registered_voter', data.mother_registered_voter ? 'true' : 'false');
        formData.append('mother_voting_years', data.mother_voting_years || 0);

        // Append father information
        formData.append('father_firstname', data.father_firstname || '');
        formData.append('father_middlename', data.father_middlename || '');
        formData.append('father_lastname', data.father_lastname || '');
        formData.append('father_current_address', data.father_current_address || '');
        formData.append('father_permanent_address', data.father_permanent_address || '');
        formData.append('father_contact_number', data.father_contact_number || '');
        formData.append('father_registered_voter', data.father_registered_voter ? 'true' : 'false');
        formData.append('father_voting_years', data.father_voting_years || 0);

        // Append files
        if (data.coe_file) formData.append('coe_file', data.coe_file);
        if (data.brgy_indigency) formData.append('brgy_indigency', data.brgy_indigency);
        if (data.cog_file) formData.append('cog_file', data.cog_file);
        if (data.school_id) formData.append('school_id', data.school_id);
        if (data.parent_id) formData.append('parent_id', data.parent_id);
        if (data.certificate_of_registration_comelec) {
            formData.append('certificate_of_registration_comelec', data.certificate_of_registration_comelec);
        }

        // Append profile picture
        formData.append('profile_picture', data.profile_picture || 'default');


        const result = await axios.post(`${BASE_URL}/accounts/updateProfiles`, formData)

        if (result) {
            console.log(result)
            console.log('Successfully update profile.')
            return result.data
        }

    } catch (error) {
        console.log('error in server:', error)
        return null
    }

    
}