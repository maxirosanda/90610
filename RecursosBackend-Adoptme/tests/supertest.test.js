import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080')


describe('test con supertest',function (){
    describe('Test de mascotas',function(){
        it('Endpoint para crear una mascota',async function(){
            const pet = {
                name:'Pitu',
                specie:'Perro',
                birthDate:'12/06/2010'
            }
         const {_body} =  await requester.post('/api/pets').send(pet)
         expect(_body.payload).to.have.property('_id')
         expect(_body.payload.name).to.be.equal('Pitu')
    })
    it('Endpoint para crear una mascota devuelva adopted en false',async function(){
        const pet = {
            name:'Pitu',
            specie:'Perro',
            birthDate:'12/06/2010'
        }
     const {_body} =  await requester.post('/api/pets').send(pet)
     expect(_body.payload.adopted).to.be.equal(false)
    })

    it('Enpoint get pets',async function(){

     const {_body} =  await requester.get('/api/pets')
     expect(_body).to.have.property('status')
     expect(_body).to.have.property('payload')
     expect(_body.payload).to.be.an('array')
    })

    it('Endpoint para crear una mascota devuelva adopted en false',async function(){
        const pet = {
            name:'Pitu',
            specie:'Perro',
            birthDate:'12/06/2010'
        }
     const {_body:petCreatedBody} =  await requester.post('/api/pets').send(pet)
     const petUpdated = {
        name:"Pitu2"
     }
     const {_body:petUpdateBody} =  await requester.put(`/api/pets/${petCreatedBody.payload._id}`).send(petUpdated)
     expect(petUpdateBody.payload.name).to.be.not.equal(petCreatedBody.payload.name)
    })

    it('Endpoint para crear una mascota devuelva adopted en false',async function(){
        const pet = {
            name:'Pitu',
            specie:'Perro',
            birthDate:'12/06/2010'
        }
     const {_body:petCreatedBody} =  await requester.post('/api/pets').send(pet)
     await requester.delete(`/api/pets/${petCreatedBody.payload._id}`)
     const {statusCode} =  await requester.get(`/api/pets/${petCreatedBody.payload._id}`)
     expect(statusCode).to.be.equal(404)
    })

    it('Endpoint para crear una mascota',async function(){

     const {_body} =  await requester.post('/api/pets/withimage')
                                                        .field('name', 'Dalma')
                                                        .field('specie','Gato')
                                                        .field('birthDate', '12/09/2020')
                                                        .attach('image', './tests/images/cat.jpg')
     expect(_body.status).to.be.equal('success')
     expect(_body.payload.name).to.be.equal('Dalma')
})



})

  describe('Tests Avanzado',function(){
    const user = {
        id:""
    }
    const cookie = {
        name:'',
        value:''
    }

    after(async function(){
       const {_body} = await requester.delete(`/api/users/${user.id}`)
    })

    it("debe registrar un usuario correctament",async function(){
        const newUser = {
            first_name:'Mauro',
            last_name:'Lopez',
            email:'mauro_lopez7777777@gmail.com',
            password:'123456ab'
        }
        const {ok,_body}= await requester.post('/api/sessions/register').send(newUser)
        user.id = _body.payload
        expect(ok).to.be.ok
    })

    it('debe logiar al usuario y coseguir la cookie',async function (){
        const user = {
            email:'mauro_lopez7777777@gmail.com',
            password:'123456ab'
        }
        const {ok,headers} = await requester.post('/api/sessions/login').send(user)
        const cookieResult = headers['set-cookie'][0];

        cookie.name = cookieResult.split('=')[0]
        cookie.value = cookieResult.split('=')[1]

        expect(cookieResult).to.be.ok;
        expect(ok).to.be.ok
        expect(cookie.name).to.be.ok.and.eql('coderCookie');
    })

    it('Debe enviar la cookie que contiene el usuario y destructurar éste correctamente', async function () {
        const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);
      
        expect(_body.payload.email).to.be.eql('mauro_lopez7777777@gmail.com');
    });
      
  })


})

