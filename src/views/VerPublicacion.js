import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState } from 'react';
import { globalStyles } from '../../globalStyles'
import PerfilHeader from '../components/PerfilHeader';
import Swiper from 'react-native-swiper';
import TraceRouteBotton from './seePublicationModals/TraceRouteBotton';
import SeeRouteTravel from './seePublicationModals/SeeRouteTravel';

const VerPublicacion = ({navigation, route}) => {
    const { datos } = route.params;
    const [currentPage, setCurrentPage] = useState(0);

    const imagenes = datos.images.map(image => ({ uri: image }));

    return (
        <View>
            <View style={[globalStyles.form, {alignItems: 'center',}]}>
                <View style={{width: wp("95%")}}>
                    <Text style={styles.titulo}>{datos.title}</Text>
                </View>
                <View style={styles.contendorImagenes}>
                    <Swiper style={styles.wrapper} showsButtons={false} 
                        loop={false}
                        loopClonesPerSide={1}>
                        {imagenes.map((imagen, index) => (
                            <View key={index} style={styles.slide}>
                                <Image source={imagen} style={styles.image} />
                            </View>
                        ))}
                    </Swiper>
                </View>
                <View style={{width: wp("95%")}}>
                    <Text style={styles.textCost}>$ {datos.cost} - $ {datos.maxCost}</Text>
                    <View style={styles.centerText}>
                        <Text style={[styles.textoDatos, styles.bold]}>Detalles: </Text>
                        <Text style={styles.textoDatos} multiline={true}>{datos.details}</Text>
                    </View>

                    <View style={styles.centerText}>
                        <Text style={[styles.textoDatos, styles.bold]}>Días: </Text>
                        <Text style={styles.textoDatos}>{datos.days.join('-')}</Text>
                    </View>

                    <View style={styles.centerText}>
                        <Text style={[styles.textoDatos, styles.bold]}>Horario: </Text>
                        <Text style={styles.textoDatos}>{datos.schedule} - {datos.scheduleEnd}</Text>
                    </View>

                    <View style={styles.centerText}>
                        <Text style={[styles.textoDatos, styles.bold]}>Contacto: </Text>   
                        <Text style={styles.textoDatos}>{datos.contact}</Text>   
                    </View>
                    <View style={styles.centerText}>
                        {datos.category != "Viaje" && <Text style={[styles.textoDatos, styles.bold]}>Articulos disponibles: {datos.cantidad}</Text>}
                        {datos.category == "Viaje" && <Text style={[styles.textoDatos, styles.bold]}>Asientos disponibles: {datos.cantidad}</Text>}
                    </View>
                    
                    {datos.category !="Viaje" && (
                        <View style={styles.centerText}>
                            <Text style={[styles.textoDatos, styles.bold]}>Lugar: </Text> 
                            <Text style={styles.textoDatos}>{datos.location} </Text> 
                        </View>
                    )}
                    {datos.category !="Viaje" && <TraceRouteBotton modulo={datos.location} />}
                    {datos.category =="Viaje" && <SeeRouteTravel location={datos.coordinates} />}
                    
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contendorImagenes:{
        width: wp("96%"),
        height: hp("40%"),
    },
    titulo:{
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 4,
        color: "black",
        textAlign: "justify",
        alignSelf: "flex-start",
    },
    textoDatos:{
        fontSize: 18,
        color: "black",
        textAlign: "justify",
        // borderWidth: 2,
    },
    image: {
        width: wp("95%"),
        height: hp("39%"),
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText:{
        flexDirection: "row",
        alignItems: "center",
    },
    bold:{
        fontWeight: "bold"
    },
    textCost:{
        fontSize: 32,
        fontWeight: "bold",
        color: "black",
    },
})

export default VerPublicacion;