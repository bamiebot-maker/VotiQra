import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react-native';
import { BrandMark } from '@/components/voter/BrandMark';
import { PrimaryButton } from '@/components/voter/PrimaryButton';
import { useAuth } from '@/hooks/useAuth';

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); const [loading, setLoading] = useState(false); const [message, setMessage] = useState('');

  async function submit(): Promise<void> {
    setMessage('');
    if (!email.includes('@') || password.length < 8 || (mode === 'signup' && name.trim().length < 2)) { setMessage('Enter valid details and a password of at least 8 characters.'); return; }
    setLoading(true);
    const error = mode === 'signin' ? await signIn(email, password) : await signUp(name, email, password);
    setLoading(false);
    if (error) { setMessage(error); return; }
    if (mode === 'signup') { setMessage('Account created. Confirm your email if requested, then sign in.'); setMode('signin'); return; }
    router.replace('/(onboarding)');
  }

  return <SafeAreaView style={styles.safe}><KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}><BrandMark /><View style={styles.hero}><Text style={styles.kicker}>SECURE VOTER ACCESS</Text><Text style={styles.title}>{mode === 'signin' ? 'Your voice starts here.' : 'Create your voter account.'}</Text><Text style={styles.subtitle}>Sign in with the identity approved by your organization. Only eligible voters can enter an election.</Text></View><View style={styles.form}>{mode === 'signup' && <View style={styles.inputWrap}><Text style={styles.inputLabel}>Full name</Text><TextInput value={name} onChangeText={setName} placeholder="Your full name" placeholderTextColor="#8CA099" style={styles.input} autoCapitalize="words" /></View>}<View style={styles.inputWrap}><Text style={styles.inputLabel}>Email address</Text><View style={styles.iconInput}><Mail size={18} color="#6B8279" /><TextInput value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor="#8CA099" style={styles.iconField} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} /></View></View><View style={styles.inputWrap}><Text style={styles.inputLabel}>Password</Text><View style={styles.iconInput}><LockKeyhole size={18} color="#6B8279" /><TextInput value={password} onChangeText={setPassword} placeholder="Minimum 8 characters" placeholderTextColor="#8CA099" style={styles.iconField} secureTextEntry={!showPassword} /><Pressable onPress={() => setShowPassword(value => !value)}>{showPassword ? <EyeOff size={19} color="#6B8279" /> : <Eye size={19} color="#6B8279" />}</Pressable></View></View>{message ? <Text style={styles.message}>{message}</Text> : null}<PrimaryButton label={mode === 'signin' ? 'Sign in securely' : 'Create account'} onPress={() => void submit()} loading={loading} /><Pressable onPress={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMessage(''); }} style={styles.switch}><Text style={styles.switchText}>{mode === 'signin' ? 'New to Votiqra? ' : 'Already registered? '}<Text style={styles.switchStrong}>{mode === 'signin' ? 'Create account' : 'Sign in'}</Text></Text></Pressable></View><View style={styles.security}><Text style={styles.shield}>✓</Text><Text style={styles.securityText}>Your account is protected by Supabase authentication and tenant-level security.</Text></View></ScrollView></KeyboardAvoidingView></SafeAreaView>;
}

const styles = StyleSheet.create({ safe:{flex:1,backgroundColor:'#F7FBF9'},flex:{flex:1},content:{padding:24,paddingTop:30,paddingBottom:40},hero:{marginTop:52,marginBottom:30},kicker:{fontSize:10,fontWeight:'900',letterSpacing:2,color:'#08A66C'},title:{fontSize:43,lineHeight:46,fontWeight:'900',letterSpacing:-2,color:'#10251F',marginTop:12},subtitle:{fontSize:15,lineHeight:24,color:'#60756E',marginTop:14},form:{gap:17},inputWrap:{gap:8},inputLabel:{fontSize:12,fontWeight:'800',color:'#28483E'},input:{height:54,borderWidth:1,borderColor:'#D6E5DF',borderRadius:14,paddingHorizontal:16,fontSize:15,color:'#10251F',backgroundColor:'#FFFFFF'},iconInput:{height:54,borderWidth:1,borderColor:'#D6E5DF',borderRadius:14,paddingHorizontal:15,flexDirection:'row',alignItems:'center',gap:11,backgroundColor:'#FFFFFF'},iconField:{flex:1,fontSize:15,color:'#10251F'},message:{fontSize:12,lineHeight:18,color:'#B33B2E',backgroundColor:'#FFF1EF',borderRadius:10,padding:11},switch:{alignItems:'center',padding:10},switchText:{fontSize:13,color:'#60756E'},switchStrong:{fontWeight:'900',color:'#087A52'},security:{marginTop:35,backgroundColor:'#EAF8F2',borderRadius:15,padding:15,flexDirection:'row',gap:11,alignItems:'center'},shield:{width:28,height:28,borderRadius:14,backgroundColor:'#08A66C',color:'#FFFFFF',textAlign:'center',paddingTop:4,fontWeight:'900'},securityText:{flex:1,fontSize:11,lineHeight:17,color:'#49685E'} });
