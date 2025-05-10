// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { Alert, Platform } from 'react-native';
// import { supabase } from './lib/supabase';
// import * as WebBrowser from 'expo-web-browser';
// import * as AuthSession from 'expo-auth-session';
// import Constants from 'expo-constants';
// import { router } from 'expo-router';

// // Ensure WebBrowser redirects are handled properly
// WebBrowser.maybeCompleteAuthSession();

// // Define your app's User type
// type User = {
//   uid: string;
//   email: string | null;
//   fullName: string | null;
//   photoURL?: string | null;
// };

// // Define the Supabase user type for internal use
// type SupabaseUser = {
//   id: string;
//   email: string | null;
//   user_metadata?: {
//     fullName?: string;
//     avatar_url?: string;
//   };
//   phone?: string;
// };

// type AuthContextType = {
//   user: User | null;
//   loading: boolean;
//   signup: (email: string, password: string, fullName: string) => Promise<User | null>;
//   login: (email: string, password: string) => Promise<User | null>;
//   logout: () => Promise<void>;
//   signInWithGoogle: () => Promise<User | null>;
//   createUserProfile: (supabaseUser: SupabaseUser) => Promise<void>
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Get your Expo redirect URI
// // In your AuthContext.tsx
// // const redirectUri = AuthSession.makeRedirectUri({
// //   scheme: Constants.appOwnership === 'expo' ? undefined : 'royalty',
// //   path: Constants.appOwnership === 'expo' ? 'auth' : 'redirect'  
// // });

// const redirectUri = AuthSession.makeRedirectUri({
//   // For production builds
//   scheme: 'royalty',
//   path: 'redirect',
//   // For Expo Go (automatically uses proxy)
//   ...(Constants.appOwnership === 'expo' && {
//     scheme: undefined,
//     path: 'auth'
//   })
// });

// console.log("Generated redirect URI:", redirectUri);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     // Check authentication state on component mount
//     const checkAuthState = async () => {
//       setLoading(true);
//       try {
//         // First check for an existing session
//         const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
//         if (sessionError) {
//           console.log('Session error:', sessionError.message);
//           setUser(null);
//           return;
//         }
        
//         if (sessionData?.session) {
//           // If we have a session, then get the user
//           const { data, error } = await supabase.auth.getUser();
          
//           if (error) {
//             console.log('Error fetching user:', error.message);
//             setUser(null);
//           } else if (data?.user) {
//             setUser({
//               uid: data.user.id,
//               email: data.user.email ?? null,
//               fullName: data.user.user_metadata?.fullName || null,
//               photoURL: data.user.user_metadata?.avatar_url || null,
//             });
//           }
//         } else {
//           // No session found, which is normal for logged-out state
//           setUser(null);
//         }
//       } catch (error) {
//         console.log('Authentication check error:', error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     checkAuthState();
    
//     // Set up auth state change listener
//     // const { data: authListener } = supabase.auth.onAuthStateChange(
//     //   async (event, session) => {
//     //     console.log('Auth event:', event, 'Session:', session ? 'exists' : 'null');
//     //     console.log('This is the', event);

//     //     if (event === 'SIGNED_IN' && session?.user) {
//     //       console.log('This is the', event);
//     //       console.log('This is the', session);
          
//     //       setUser({
//     //         uid: session.user.id,
//     //         email: session.user.email ?? null,
//     //         fullName: session.user.user_metadata?.fullName || null,
//     //         photoURL: session.user.user_metadata?.avatar_url || null,
//     //       });
//     //       console.log('Setting user state:', user);
//     //       // Create user profile if needed
//     //       await createUserProfile(session.user as SupabaseUser);
//     //     } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
//     //       console.log('User has:', event)
//     //       setUser(null);
//     //     } else if (event === 'TOKEN_REFRESHED' && session?.user) {
//     //         console.log('Token Refreshed')
//     //       // Update user on token refresh
//     //       setUser({
//     //         uid: session.user.id,
//     //         email: session.user.email ?? null,
//     //         fullName: session.user.user_metadata?.fullName || null,
//     //         photoURL: session.user.user_metadata?.avatar_url || null,
//     //       });
//     //     }
//     //   }
//     // );
//       // In auth-context.tsx, update the onAuthStateChange handler:

//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log('Auth event:', event, 'Session:', session ? 'exists' : 'null');
        
//         if (event === 'SIGNED_IN' && session?.user) {
//           console.log('This is the', event);
          
//           // Create a proper user object from the session
//           const newUser = {
//             uid: session.user.id,
//             email: session.user.email ?? null,
//             fullName: session.user.user_metadata?.fullName || session.user.user_metadata?.full_name || null,
//             photoURL: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null,
//           };
          
//           // Update user state with the properly constructed object
//           setUser(newUser);
//           console.log('Setting user state:', newUser); // Updated logging to show new user object
          
//           // Create user profile if needed
//           await createUserProfile(session.user as SupabaseUser);
//         } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
//           console.log('User has:', event)
//           console.log('When event is SIGNED_OUT, user is:', user);
          
//           setUser(null);
//         } else if (event === 'TOKEN_REFRESHED' && session?.user) {
//           console.log('Token Refreshed')
//           // Update user on token refresh
//           setUser({
//             uid: session.user.id,
//             email: session.user.email ?? null,
//             fullName: session.user.user_metadata?.fullName || session.user.user_metadata?.full_name || null,
//             photoURL: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null,
//           });
//         }
//       }
//     );
    
//     return () => {
//       if (authListener && authListener.subscription) {
//         authListener.subscription.unsubscribe();
//       }
//     };
//   }, []);

//   // Function to convert Supabase user to app User type
//   const mapSupabaseUser = (supabaseUser: SupabaseUser): User => {
//     return {
//       uid: supabaseUser.id,
//       email: supabaseUser.email,
//       fullName: supabaseUser.user_metadata?.fullName || supabaseUser.user_metadata?.fullName || null,
//       photoURL: supabaseUser.user_metadata?.avatar_url || null,
//     };
//   };

//   // const signup = async (email: string, password: string, fullName: string): Promise<User | null> => {
//   //   setLoading(true);
//   //   try {
//   //     // Sign up the user
//   //     const { data, error } = await supabase.auth.signUp({
//   //       email,
//   //       password,
//   //       options: {
//   //         data: {
//   //           fullName,
//   //         }
//   //       }
//   //     });
  
//   //     if (error) {
//   //       throw error;
//   //     }
  
//   //     if (data.user) {
//   //       const newUser = mapSupabaseUser(data.user as SupabaseUser);
//   //       // Update user state
//   //       setUser(newUser);
        
//   //       // Create user profile
//   //       await createUserProfile(data.user as SupabaseUser);

//   //       console.log('This is the new user:', newUser);
        
//   //       return newUser;
//   //     }
//   //     return null;
//   //   } catch (error: any) {
//   //     console.error("Signup error:", error.message);
//   //     Alert.alert("Signup Error", error.message);
//   //     return null;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const signup = async (email: string, password: string, fullName: string): Promise<boolean> => {
//     setLoading(true);
//     try {
//       // Check if the email already exists
//       const { data: emailCheck, error: emailCheckError } = await supabase.rpc(
//         'check_email_exists', 
//         { email_to_check: email }
//       );
  
//       if (emailCheckError) {
//         console.error("Email check error:", emailCheckError);
//         throw new Error("Error checking email availability");
//       }
  
//       if (emailCheck) {
//         throw new Error('Email already in use. Please use a different email or try logging in.');
//       }
  
//       // Sign up the user
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             fullName,
//           }
//         }
//       });
  
//       if (error) {
//         throw error;
//       }
  
//       if (data.user) {
//         // Create user profile
//         await createUserProfile(data.user as SupabaseUser);
        
//         // Sign out the user - ProtectedWrapper will handle navigation
//         await supabase.auth.signOut();
        
//         // Just show a success message, no need to navigate manually
//         Alert.alert(
//           "Signup Successful", 
//           "Your account has been created. Please log in with your credentials."
//         );
        
//         return true;
//       }
//       return false;
//     } catch (error: any) {
//       console.error("Signup error:", error.message);
//       Alert.alert("Signup Error", error.message);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email: string, password: string): Promise<User | null> => {
//     setLoading(true);
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
      
//       if (error) {
//         throw error;
//       }
      
//       if (data.user) {
//         const loggedInUser = mapSupabaseUser(data.user as SupabaseUser);
//         setUser(loggedInUser);
//         // Create user profile
//         await createUserProfile(data.user as SupabaseUser);
//         return loggedInUser;
//       }
//       return null;
//     } catch (error: any) {
//       console.log('Login error:', error.message);
//       Alert.alert('Login Error', error.message);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const signInWithGoogle = async (): Promise<User | null> => {
//   //   setLoading(true);
//   //   try {
//   //     console.log("Using redirect URI:", redirectUri);
      
//   //     const isExpoGo = Constants.appOwnership === 'expo';
      
//   //     // Create the Google OAuth URL with Supabase
//   //     const { data, error } = await supabase.auth.signInWithOAuth({
//   //       provider: 'google',
//   //       options: {
//   //         redirectTo: redirectUri,
//   //         queryParams: {
//   //           access_type: 'offline',
//   //           prompt: 'consent',
//   //         },
//   //         // Add this for Expo Go compatibility
//   //         skipBrowserRedirect: true,
//   //       },
//   //     });
      
//   //     if (error) throw error;


      
//   //     // if (data?.url) {
//   //     //   console.log("Opening auth URL:", data.url);
        
//   //     //   let result;
        
//   //     //   if (isExpoGo && Platform.OS === 'android') {
//   //     //     result = await WebBrowser.openBrowserAsync(data.url);
//   //     //   } else {
//   //     //     result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);
//   //     //   }
        
//   //     //   console.log("Browser result:", result);
//   //     //   console.log("Auth result type:", result.type);
        
//   //     //   // For non-Expo builds - handle direct success case
//   //     //   if (!isExpoGo && result.type === 'success' && result.url) {
//   //     //     const url = result.url;
          
//   //     //     // Handle both code flow and token flow
//   //     //     try {
//   //     //       // Code flow
//   //     //       if (url.includes('code=')) {
//   //     //         const urlObj = new URL(url);
//   //     //         const code = urlObj.searchParams.get('code');
              
//   //     //         if (code) {
//   //     //           const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
                
//   //     //           if (sessionError) throw sessionError;
                
//   //     //           if (sessionData?.user) {
//   //     //             await createUserProfile(sessionData.user as SupabaseUser);
//   //     //             return mapSupabaseUser(sessionData.user as SupabaseUser);
//   //     //           }
//   //     //         }
//   //     //       } 
//   //     //       // Token flow
//   //     //       else if (url.includes('access_token=')) {
//   //     //         const urlObj = new URL(url);
//   //     //         const fragment = urlObj.hash.substring(1);
//   //     //         const params = new URLSearchParams(fragment);
//   //     //         const accessToken = params.get('access_token');
              
//   //     //         if (accessToken) {
//   //     //           const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);
                
//   //     //           if (userError) throw userError;
                
//   //     //           if (userData?.user) {
//   //     //             await createUserProfile(userData.user as SupabaseUser);
//   //     //             return mapSupabaseUser(userData.user as SupabaseUser);
//   //     //           }
//   //     //         }
//   //     //       }
//   //     //     } catch (parseError) {
//   //     //       console.error("Error parsing redirect URL:", parseError);
//   //     //     }
//   //     //   }
        
//   //     //   // For Expo Go or if direct handling failed
//   //     //   // Check for session periodically
//   //     //   const checkInterval = setInterval(async () => {
//   //     //     try {
//   //     //       const { data: sessionData } = await supabase.auth.getSession();
            
//   //     //       if (sessionData?.session?.user) {
//   //     //         clearInterval(checkInterval);
//   //     //         console.log("Session detected after Google login");
              
//   //     //         // Create user profile
//   //     //         await createUserProfile(sessionData.session.user as SupabaseUser);
              
//   //     //         // Update local user state
//   //     //         setUser(mapSupabaseUser(sessionData.session.user as SupabaseUser));
              
//   //     //         // Force navigation to home
//   //     //         setTimeout(() => {
//   //     //           router.replace('/(tabs)');
//   //     //         }, 300);
//   //     //       }
//   //     //     } catch (sessionError) {
//   //     //       console.error("Error checking session:", sessionError);
//   //     //     }
//   //     //   }, 1000);
        
//   //     //   // Stop checking after 30 seconds
//   //     //   setTimeout(() => {
//   //     //     clearInterval(checkInterval);
//   //     //     console.log("Stopped checking for session after timeout");
//   //     //   }, 30000);
//   //     // }
//   //     console.log("this is data from google auth:", data)
//   //     if (data?.url) {
//   //       const result = await WebBrowser.openAuthSessionAsync(
//   //         data.url,
//   //         redirectUri
//   //       );
  
//   //       if (result.type === 'success') {
//   //         await supabase.auth.startAutoRefresh();
//   //         // Let ProtectedWrapper handle navigation
//   //       }
//   //     }
      
//   //     // return null;
//   //   } catch (error: any) {
//   //     console.error('Google Sign In Error:', error.message);
//   //     Alert.alert('Google Sign In Error', error.message);
//   //     return null;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const signInWithGoogle = async (): Promise<User | null> => {
//   //   setLoading(true);
//   //   try {
//   //     console.log("Using redirect URI:", redirectUri);
      
//   //     // Create the Google OAuth URL with Supabase
//   //     const { data, error } = await supabase.auth.signInWithOAuth({
//   //       provider: 'google',
//   //       options: {
//   //         redirectTo: redirectUri,
//   //         queryParams: {
//   //           access_type: 'offline',
//   //           prompt: 'consent',
//   //         },
//   //         skipBrowserRedirect: true,
//   //       },
//   //     });
      
//   //     if (error) throw error;
  
//   //     console.log("this is data from google auth:", data);
      
//   //     if (data?.url) {
//   //       // Open the authentication URL
//   //       const result = await WebBrowser.openAuthSessionAsync(
//   //         data.url,
//   //         redirectUri
//   //       );
  
//   //       if (result.type === 'success') {
//   //         await supabase.auth.startAutoRefresh();
          
//   //         // Important: Wait for session to be established
//   //         const maxAttempts = 10;
//   //         let attempts = 0;
          
//   //         while (attempts < maxAttempts) {
//   //           attempts++;
//   //           console.log(`Checking for session (attempt ${attempts}/${maxAttempts})...`);
            
//   //           const { data: sessionData } = await supabase.auth.getSession();
            
//   //           if (sessionData?.session?.user) {
//   //             console.log("Session found after Google login:", sessionData.session.user.email);
              
//   //             // Create user profile
//   //             await createUserProfile(sessionData.session.user as SupabaseUser);
              
//   //             // Update user state directly to ensure it's set
//   //             const newUser = mapSupabaseUser(sessionData.session.user as SupabaseUser);
//   //             setUser(newUser);
              
//   //             return newUser;
//   //           }
            
//   //           // Wait before checking again
//   //           await new Promise(resolve => setTimeout(resolve, 500));
//   //         }
          
//   //         console.log("Failed to get session after multiple attempts");
//   //       } else {
//   //         console.log("Auth session did not complete successfully:", result.type);
//   //       }
//   //     }
      
//   //     return null;
//   //   } catch (error: any) {
//   //     console.error('Google Sign In Error:', error.message);
//   //     Alert.alert('Google Sign In Error', error.message);
//   //     return null;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const signInWithGoogle = async (): Promise<User | null> => {
//   //   setLoading(true);
//   //   try {
//   //     console.log("Using redirect URI:", redirectUri);
      
//   //     // Create the Google OAuth URL with Supabase
//   //     const { data, error } = await supabase.auth.signInWithOAuth({
//   //       provider: 'google',
//   //       options: {
//   //         redirectTo: redirectUri,
//   //         queryParams: {
//   //           access_type: 'offline',
//   //           prompt: 'consent',
//   //         },
//   //         skipBrowserRedirect: true,
//   //       },
//   //     });
      
//   //     if (error) throw error;
  
//   //     console.log("this is data from google auth:", data);
      
//   //     if (data?.url) {
//   //       // Open the authentication URL
//   //       const result = await WebBrowser.openAuthSessionAsync(
//   //         data.url,
//   //         redirectUri
//   //       );
  
//   //       // The session establishment will be handled by the deep link handler
//   //       if (result.type === 'success') {
//   //         // We'll just wait here briefly to allow the deep link handler to work
//   //         await new Promise(resolve => setTimeout(resolve, 1000));
          
//   //         // Check if we have a session now
//   //         const { data: sessionData } = await supabase.auth.getSession();
//   //         if (sessionData?.session?.user) {
//   //           await createUserProfile(sessionData.session.user as SupabaseUser);
//   //           return mapSupabaseUser(sessionData.session.user as SupabaseUser);
//   //         }
//   //       }
//   //     }
      
//   //     return null;
//   //   } catch (error: any) {
//   //     console.error('Google Sign In Error:', error.message);
//   //     Alert.alert('Google Sign In Error', error.message);
//   //     return null;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   const signInWithGoogle = async (): Promise<User | null> => {
//     setLoading(true);    
//     try {
//       console.log("Using redirect URI:", redirectUri);
      
//       // Create the Google OAuth URL with Supabase
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: redirectUri,
//           queryParams: {
//             access_type: 'offline',
//             prompt: 'consent',
//           },
//           skipBrowserRedirect: true,
//         },
//       });
      
//       if (error) throw error;
  
//       console.log("this is data from google auth:", data);
      
//       if (data?.url) {
//         // Open the authentication URL
//         const result = await WebBrowser.openAuthSessionAsync(
//           data.url,
//           redirectUri
//         );
  
//         // Check for successful authentication
//         if (result.type === 'success') {
//           console.log("Auth session completed successfully");
          
//           // The deep link handler will process the tokens
//           // Just make sure we're not stuck in loading state
          
//           // Important: Always ensure we exit the loading state
//           setTimeout(() => {
//             if (loading) {
//               console.log("Forcing loading state to false after timeout");
//               setLoading(false);
//             }
//           }, 5000);
          
//           return null; // The auth state change handler will take care of setting the user
//         } else {
//           console.log("Auth session failed or was cancelled:", result.type);
//         }
//       }
      
//       return null;
//     } catch (error: any) {
//       console.error('Google Sign In Error:', error.message);
//       Alert.alert('Google Sign In Error', error.message);
//       return null;
//     } finally {
//       // Ensure loading is turned off
//       setLoading(false);
//     }
//   };

//   // const logout = async (): Promise<void> => {
//   //   console.log('Trying to logout');    
//   //   setLoading(true);
//   //   console.log(loading);

//   //   try {
//   //     const { error } = await supabase.auth.signOut();
//   //     if (error) throw error;
//   //     setUser(null);
//   //     console.log('Logout function is setting user to:', user);
      
//   //   } catch (error: any) {
//   //     console.log('Logout error:', error.message);
//   //     Alert.alert('Logout Error', error.message);
//   //   } finally {
//   //     console.log('Logout function is setting user to:', user);
//   //     setLoading(false);
//   //   }
//   // };

//   // Function to create user profile after successful signup
  
//   const logout = async (): Promise<void> => {
//     console.log('Starting logout process');
    
//     // Add a timeout to prevent hanging
//     const signOutWithTimeout = async () => {
//       return Promise.race([
//         supabase.auth.signOut(),
//         new Promise((_, reject) => setTimeout(() => reject(new Error('Logout timed out')), 5000))
//       ]);
//     };
    
//     try {
//       console.log("Debugging the try/catch of the logout function");
      
//       // First call the Supabase signOut with timeout protection
//       const { error } = await signOutWithTimeout() as { error: Error | null };
      
//       console.log("Debugging the try/catch of the logout function 2");
      
//       if (error) throw error;
      
//       // Only after successful signOut, update the local state
//       setUser(null);
      
//       console.log('Logout successful, user state cleared');
      
//       // No need to force navigation - ProtectedWrapper will handle it
//     } catch (error: any) {
//       console.log('Logout error:', error.message);
      
//       // Even if there's a timeout or error, still clear the local user state
//       // This ensures the user can at least navigate to the login screen
//       setUser(null);
      
//       Alert.alert('Logout Notice', 'You have been logged out, but there might have been an issue with the server. ' + error.message);
//     } finally {
//       // Make sure loading is always set to false at the end
//       setLoading(false);
//     }
//   };
  
  
  
//   const createUserProfile = async (supabaseUser: SupabaseUser) => {
//     if (!supabaseUser) return;
    
//     try {
//       // Check if profile already exists
//       const { data: existingProfile } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', supabaseUser.id)
//         .single();
      
//       // If profile exists, no need to create a new one
//       if (existingProfile) return;
      
//       // Extract first and last name
//       let firstName = null;
//       let lastName = null;
      
//       if (supabaseUser.user_metadata?.fullName) {
//         const nameParts = supabaseUser.user_metadata.fullName.trim().split(' ');
//         firstName = nameParts[0];
//         if (nameParts.length > 1) {
//           lastName = nameParts[nameParts.length - 1];
//         }
//       }
      
//       // Create profile
//       const { error } = await supabase
//         .from('profiles')
//         .insert({
//           id: supabaseUser.id,
//           first_name: firstName,
//           last_name: lastName,
//           profile_image_url: supabaseUser.user_metadata?.avatar_url,
//           phone_number: supabaseUser.phone || null,
//           role: 'MEMBER' // Default role
//         });
        
//       if (error) {
//         console.error('Error creating profile:', error);
//         // We don't want to block the user from proceeding if profile creation fails
//         // Just log the error for now
//       }
//     } catch (profileError) {
//       console.error('Profile creation error:', profileError);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       loading, 
//       signup, 
//       login, 
//       logout,
//       signInWithGoogle,
//       createUserProfile
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };