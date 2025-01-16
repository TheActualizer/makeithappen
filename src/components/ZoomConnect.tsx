import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ZoomConnect = () => {
  const handleZoomConnect = async () => {
    try {
      console.log('Initiating Zoom OAuth flow');
      
      const { data: { origin } } = await supabase.functions.invoke('get-secret', {
        body: { name: 'ZOOM_CLIENT_ID' }
      });

      // Zoom OAuth configuration
      const clientId = origin;
      const redirectUri = `${window.location.origin}/functions/v1/zoom-oauth-callback`;
      const responseType = 'code';
      
      // Required Zoom scopes
      const scopes = [
        'meeting:write:admin',
        'meeting:read:admin',
        'user:read:admin',
        'user:write:admin',
        'account:read:admin',
        'account:write:admin'
      ].join(' ');

      // Construct OAuth URL
      const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

      console.log('Opening Zoom authorization window');
      window.open(zoomAuthUrl, '_blank', 'width=800,height=600');
    } catch (error) {
      console.error('Error initiating Zoom connection:', error);
    }
  };

  return (
    <Button 
      onClick={handleZoomConnect}
      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
    >
      <Video className="w-4 h-4" />
      Connect with Zoom
    </Button>
  );
};

export default ZoomConnect;