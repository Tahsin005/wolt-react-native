import { Colors } from '@/constants/theme';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface Marker {
    id: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    title: string;
}

interface LeafletMapProps {
    markers: Marker[];
    onMarkerClick: (markerId: string) => void;
    userLocation?: {
        latitude: number;
        longitude: number;
    };
}

const LeafletMap: React.FC<LeafletMapProps> = ({ markers, onMarkerClick, userLocation }) => {
    const htmlContent = useMemo(() => {
        const markersJs = markers
            .map(
                (m) => `
      L.marker([${m.coordinates.latitude}, ${m.coordinates.longitude}])
        .addTo(map)
        .on('click', () => {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'markerClick', id: '${m.id}' }));
        });
    `
            )
            .join('\n');

        const centerLat = userLocation?.latitude ?? 51.505;
        const centerLng = userLocation?.longitude ?? -0.09;
        const zoom = userLocation ? 16 : 13;

        return `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Leaflet Map</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
          <style>
              body { margin: 0; padding: 0; }
              #map { height: 100vh; width: 100%; }
              .leaflet-control-attribution { display: none !important; }
          </style>
      </head>
      <body>
          <div id="map"></div>
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
          <script>
              var map = L.map('map').setView([${centerLat}, ${centerLng}], ${zoom});
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

              ${markersJs}

              ${userLocation
                ? `
                L.circle([${userLocation.latitude}, ${userLocation.longitude}], {
                  color: '${Colors.primary}',
                  fillColor: '${Colors.primary}',
                  fillOpacity: 0.2,
                  radius: 100
                }).addTo(map);
                
                L.circleMarker([${userLocation.latitude}, ${userLocation.longitude}], {
                  radius: 8,
                  fillColor: "#fff",
                  color: "${Colors.primary}",
                  weight: 3,
                  opacity: 1,
                  fillOpacity: 1
                }).addTo(map);
              `
                : ''
            }
          </script>
      </body>
      </html>
    `;
    }, [markers, userLocation]);

    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                onMessage={(event) => {
                    const data = JSON.parse(event.nativeEvent.data);
                    if (data.type === 'markerClick') {
                        onMarkerClick(data.id);
                    }
                }}
                scrollEnabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default LeafletMap;
