import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { BadgeCheck, KeyRound, LogOut, ShieldCheck } from 'lucide-react-native';
import { BrandMark } from '@/components/voter/BrandMark';
import { PrimaryButton } from '@/components/voter/PrimaryButton';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import type { ClaimAccessResult } from '@/types/supabase';

export default function OnboardingScreen() {
  const { profile, voter, refreshAccess, signOut } = useAuth();
  const [token, setToken] = useState(''); const [loading, setLoading] = useState(false); const [message, setMessage] = useState('');
  useEffect(() => { if (voter) router.replace('/(app)'); }, [voter]);

  async function claimByEmail(): Promise<void> {
    setLoading(true); setMessage('');
    const { data, error } = await supabase.rpc('claim_voter_by_email');
    setLoading(false);
    if (error) { setMessage(error.message); return; }
    if (!data) { setMessage('No approved voter record matches this email yet. Ask your organization administrator to add or approve you.'); return; }
    await refreshAccess(); router.replace('/(app)');
  }

  async function claimToken(): Promise<void> {
    if (token.replace(/\s|-/g, '').length < 6) { setMessage('Enter the complete voting token issued by your organization.'); return; }
    setLoading(true); setMessage('');
    const { data, error } = await supabase.rpc('claim_voter_token', { raw_token: token });
    setLoading(false);
    if (error) { setMessage(error.message); return; }
    const result = data as ClaimAccessResult;
    setMessage(result.message || 'Access verified.');
    await refreshAccess(); router.replace('/(app)');
  }

  return <SafeAreaView style={styles.safe}><KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}><View style={styles.header}><BrandMark /><Pressable onPress={() => void signOut()} style={styles.logout}><LogOut size={18} color="#60756E" /></Pressable></View><View style={styles.progress}><View style={styles.progressFill} /></View><Text style={styles.kicker}>VERIFY ELIGIBILITY</Text><Text style={styles.title}>Connect to your organization.</Text><Text style={styles.subtitle}>Your organization controls who can vote. Use the same approved email or enter the private token you received.</Text><View style={styles.identity}><BadgeCheck size={23} color="#08A66C" /><View><Text style={styles.identityLabel}>SIGNED IN AS</Text><Text style={styles.identityValue}>{profile?.email}</Text></View></View><View style={styles.card}><View style={styles.cardHead}><KeyRound size={22} color="#08A66C" /><Text style={styles.cardTitle}>Voting token</Text></View><Text style={styles.cardText}>Tokens are single-use and connect only your voter identity—not your ballot choices.</Text><TextInput value={token} onChangeText={value => setToken(value.toUpperCase())} placeholder="VQRA • XXXX • XXXX" placeholderTextColor="#92A49D" autoCapitalize="characters" autoCorrect={false} style={styles.tokenInput} /><PrimaryButton label="Verify token" onPress={() => void claimToken()} loading={loading} /></View><View style={styles.or}><View style={styles.line} /><Text style={styles.orText}>OR</Text><View style={styles.line} /></View><PrimaryButton label="Check my approved email" variant="outline" onPress={() => void claimByEmail()} loading={loading} />{message ? <Text style={styles.message}>{message}</Text> : null}<View style={styles.note}><ShieldCheck size={22} color="#087A52" /><Text style={styles.noteText}>Votiqra cannot add you to an election. Only the organization running the election can approve your access.</Text></View></ScrollView></KeyboardAvoidingView></SafeAreaView>;
}

const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#F7FBF9'},flex:{flex:1},content:{padding:24,paddingTop:24,paddingBottom:42},header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},logout:{width:42,height:42,borderRadius:13,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#DDE9E4',alignItems:'center',justifyContent:'center'},progress:{height:5,backgroundColor:'#E2EDE8',borderRadius:5,marginTop:35,marginBottom:32},progressFill:{height:5,width:'55%',backgroundColor:'#08A66C',borderRadius:5},kicker:{fontSize:10,fontWeight:'900',letterSpacing:2,color:'#08A66C'},title:{fontSize:40,lineHeight:43,fontWeight:'900',letterSpacing:-2,color:'#10251F',marginTop:12},subtitle:{fontSize:15,lineHeight:23,color:'#60756E',marginTop:13},identity:{marginTop:25,flexDirection:'row',alignItems:'center',gap:12,backgroundColor:'#EAF8F2',padding:15,borderRadius:15},identityLabel:{fontSize:8,letterSpacing:1.4,fontWeight:'900',color:'#6B8179'},identityValue:{fontSize:13,fontWeight:'800',color:'#173E32',marginTop:3},card:{marginTop:22,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#DCE9E4',borderRadius:21,padding:20,gap:14},cardHead:{flexDirection:'row',alignItems:'center',gap:10},cardTitle:{fontSize:18,fontWeight:'900',color:'#10251F'},cardText:{fontSize:12,lineHeight:19,color:'#60756E'},tokenInput:{height:58,borderRadius:14,borderWidth:1,borderColor:'#BFD8CE',backgroundColor:'#F9FCFB',textAlign:'center',fontSize:18,fontWeight:'900',letterSpacing:2,color:'#10251F'},or:{flexDirection:'row',alignItems:'center',gap:12,marginVertical:22},line:{height:1,backgroundColor:'#D9E6E1',flex:1},orText:{fontSize:9,fontWeight:'900',color:'#8A9D96'},message:{fontSize:12,lineHeight:18,color:'#A43E31',backgroundColor:'#FFF2F0',padding:12,borderRadius:11,marginTop:15},note:{flexDirection:'row',gap:11,backgroundColor:'#EDF8F4',borderRadius:15,padding:15,marginTop:24},noteText:{flex:1,fontSize:11,lineHeight:17,color:'#49685E'}});
