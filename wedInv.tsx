
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Heart, Phone, Sparkles, Music, Paintbrush, ArrowRight, Star, Flower, ExternalLink, CheckCircle } from 'lucide-react';
import { RSVPSection } from '@/components/invitations/RSVPSection';
import { RSVPConfig, TemplateProps } from '@/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { initCursorGlitter, initTouchGlitter, createMandalaEffect } from '@/utils/animation';
import { createConfetti } from '@/utils/confetti';

// Import all the new components
import Countdown from '@/components/invitations/wedding-01/Countdown';
import CoupleIllustration from '@/components/invitations/wedding-01/CoupleIllustration';
import Diya from '@/components/invitations/wedding-01/Diya';
import EventCard from '@/components/invitations/wedding-01/EventCard';
import FamilyDetailsDialog, { FamilyDetails } from '@/components/invitations/wedding-01/FamilyDetailsDialog';
import GaneshaHeader from '@/components/invitations/wedding-01/GaneshaHeader';
import PhotoCarousel from '@/components/invitations/wedding-01/PhotoCarousel';
import PhoneIcon from '@/components/invitations/wedding-01/PhoneIcon';
import AudioPlayer from '@/components/invitations/wedding-01/AudioPlayer';

const WelcomeView = ({ onEnter, eventDetails, guestName }: any) => {
  const { bride_name, groom_name, wedding_date, groom_first } = eventDetails;
  const orderedNames = groom_first === 'Groom First' ? { firstName: groom_name, secondName: bride_name } : { firstName: bride_name, secondName: groom_name };
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-maroon text-white">
      <div className="text-center z-10 p-4">
        <img src="/lovable-uploads/762354ab-cff9-4c6a-9800-94eeefc3c43c.png" alt="Lord Ganesha" className="w-32 h-32 mx-auto mb-4" />
        <h1 className="font-cormorant text-4xl md:text-5xl text-yellow-300 font-bold mb-4">{orderedNames.firstName} & {orderedNames.secondName}</h1>
        <p className="text-lg md:text-xl italic mb-6">{wedding_date}</p>
        <div className="bg-maroon/50 p-6 rounded-xl border border-yellow-400/30">
          <p className="text-2xl text-yellow-200 mb-2">Namaste, <span className="font-bold">{guestName}</span>!</p>
          <p className="mb-6">We are honored to invite you to witness the divine union of our hearts.</p>
          <button onClick={onEnter} className="group bg-gold-gradient text-maroon px-8 py-3 rounded-full font-medium flex items-center justify-center mx-auto">
            Enter Invitation <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      <AudioPlayer />
    </div>
  );
}

const InvitationView = ({ eventDetails, guestName, onAccept, hasResponded, accepted, rsvpConfig }: TemplateProps) => {
    const { toast } = useToast();
    const isMobile = useIsMobile();
    const [selectedFamily, setSelectedFamily] = useState<FamilyDetails | null>(null);
    const [familyDialogOpen, setFamilyDialogOpen] = useState(false);
    const [invitationAccepted, setInvitationAccepted] = useState(false); // Don't auto-accept from URL params

    useEffect(() => {
        const cleanup = isMobile ? initTouchGlitter() : initCursorGlitter();
        return cleanup;
    }, [isMobile]);

    const handleFamilyClick = (family: FamilyDetails) => {
        console.log('👨‍👩‍👧‍👦 User clicked on family section:', family.side);
        setSelectedFamily(family);
        setFamilyDialogOpen(true);
    };

    const handleAcceptInvitation = () => {
        console.log('🎯 User manually clicked Accept Invitation');
        
        // Prevent multiple rapid clicks
        if (invitationAccepted) {
            console.log('⚠️ Already accepted, ignoring duplicate click');
            return;
        }
        
        setInvitationAccepted(true);
        createConfetti();
        onAccept();
        console.log('✅ Invitation accepted successfully');
    };

    const isGroomFirst = eventDetails.groom_first === 'Groom First';
    const brideName = eventDetails.bride_name || 'Bride';
    const groomName = eventDetails.groom_name || 'Groom';
    const orderedNames = isGroomFirst ? { firstName: groomName, secondName: brideName } : { firstName: brideName, secondName: groomName };

    const events = (eventDetails.events || []).map((event: any) => ({
        title: event.EVENT_NAME,
        date: event.EVENT_DATE,
        time: event.EVENT_TIME,
        venue: event.EVENT_VENUE,
        icon: event.EVENT_NAME.includes('Mehndi') ? <Paintbrush /> : event.EVENT_NAME.includes('Sangeet') ? <Music /> : <Heart />,
        googleMapsUrl: event.EVENT_VENUE_MAP_LINK
    }));

    const photos = (eventDetails.photos || []).map((photo: any, index: number) => ({
        src: Object.values(photo)[0] as string,
        alt: `Couple photo ${index + 1}`
    }));

    const firstFamily: FamilyDetails | null = eventDetails.bride_family ? {
        side: 'bride', title: eventDetails.bride_family_title, description: eventDetails.bride_family_description, members: eventDetails.bride_family.FAMILY_MEMBERS || []
    } : null;

    const secondFamily: FamilyDetails | null = eventDetails.groom_family ? {
        side: 'groom', title: eventDetails.groom_family_title, description: eventDetails.groom_family_description, members: eventDetails.groom_family.FAMILY_MEMBERS || []
    } : null;

    return (
        <div className="min-h-screen relative overflow-hidden bg-maroon text-white">
            <header className="py-10 px-4 text-center">
                <GaneshaHeader />
                <h1 className="font-cormorant text-5xl md:text-7xl text-yellow-300 font-bold my-4">{orderedNames.firstName} & {orderedNames.secondName}</h1>
                <p className="text-xl md:text-2xl italic">{eventDetails.couple_tagline}</p>
                <div className="mt-8 flex justify-center"><CoupleIllustration /></div>
                <div className="mt-8"><Countdown weddingDate={eventDetails.wedding_date} weddingTime={eventDetails.wedding_time} /></div>
            </header>

            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="font-cormorant text-3xl md:text-4xl text-yellow-300 font-bold mb-4">Meet Our Families</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {firstFamily && <div onClick={() => handleFamilyClick(firstFamily)} className="bg-black/30 p-6 rounded-lg cursor-pointer"><h3 className="text-xl font-bold text-yellow-300">{firstFamily.title}</h3></div>}
                        {secondFamily && <div onClick={() => handleFamilyClick(secondFamily)} className="bg-black/30 p-6 rounded-lg cursor-pointer"><h3 className="text-xl font-bold text-yellow-300">{secondFamily.title}</h3></div>}
                    </div>
                </div>
            </section>

            <section className="py-10 px-4"><div className="max-w-5xl mx-auto"><h2 className="text-center font-cormorant text-3xl md:text-4xl text-yellow-300 font-bold mb-10">Celebration Events</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{events.map((event:any, index:number) => (<EventCard key={index} {...event} />))}</div></div></section>
            
            <section className="py-10 px-2 md:px-4"><div className="max-w-5xl mx-auto"><h2 className="font-cormorant text-3xl md:text-4xl text-yellow-300 font-bold mb-8">Our Journey</h2><PhotoCarousel photos={photos} /></div></section>

            <section className="py-10 px-4 text-center">
                {!invitationAccepted ? (
                    <button onClick={handleAcceptInvitation} className="group bg-gold-gradient text-maroon px-8 py-4 rounded-full font-bold text-lg"><span className="flex items-center">Accept Invitation <CheckCircle className="ml-2" /></span></button>
                ) : (
                    <div className="bg-maroon/60 p-8 rounded-2xl border border-yellow-400/30 max-w-2xl mx-auto">
                        <h3 className="font-cormorant text-2xl md:text-3xl text-yellow-300 font-bold mb-4">Invitation Accepted!</h3>
                        <p className="text-lg">Thank you for accepting our invitation!</p>
                    </div>
                )}
            </section>

            <RSVPSection 
              guestStatus={hasResponded && accepted ? 'accepted' : hasResponded ? 'viewed' : 'pending'} 
              guestName={guestName} 
              rsvpConfig={rsvpConfig || { type: 'simple' }} 
              hasCustomFields={rsvpConfig?.hasCustomFields || false}
              onAccept={onAccept} 
              onSubmitCustomFields={onAccept}
              onRequestEdit={() => {}}
            />

            <footer className="py-10 px-4 mt-10 border-t border-yellow-400/30 text-center"><p className="italic">"Your presence is the greatest blessing."</p></footer>
            <FamilyDetailsDialog 
                open={familyDialogOpen} 
                onOpenChange={(open) => {
                    console.log('🔒 Family dialog state change:', open);
                    setFamilyDialogOpen(open);
                }} 
                familyDetails={selectedFamily} 
            />
            <AudioPlayer />
        </div>
    );
}

export const WeddingInvitation01Template = (props: TemplateProps) => {
    const [view, setView] = useState('welcome');

    if (view === 'welcome') {
        return <WelcomeView onEnter={() => setView('invitation')} eventDetails={props.eventDetails} guestName={props.guestName} />;
    }

    return <InvitationView {...props} />;
};
