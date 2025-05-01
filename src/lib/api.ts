
import { toast } from '@/components/ui/use-toast';

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

// Error handling wrapper
const handleApiError = (error: any) => {
  console.error('API Error:', error);
  const message = error.response?.data?.message || 'An unexpected error occurred';
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive'
  });
  throw error;
};

// Problems API
export const getProblems = async () => {
  try {
    const response = await fetch(`${API_URL}/problems`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const getProblem = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/problems/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const submitSolution = async (problemId: string, userId: string, solution: string) => {
  try {
    const response = await fetch(`${API_URL}/problems/${problemId}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, solution })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// User API
export const getUserProfile = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserProgress = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/progress`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const createUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// AI Tutor API
export const sendTutorMessage = async (
  userId: string, 
  message: string, 
  conversationHistory: any[] = []
) => {
  try {
    const response = await fetch(`${API_URL}/tutor/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, message, conversationHistory })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTutorConversation = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/tutor/${userId}/conversations`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};
