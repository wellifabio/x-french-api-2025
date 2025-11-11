const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await prisma.user.createMany({
        data: [
            { userEmailAddress: "username@email.com", userPassword: "123abc" },
            { userEmailAddress: "usuario@email.com", userPassword: "senha123" }
        ],
    })

    await prisma.diary.createMany({
        data: [
            {
                "diary_id": "BA23617D-42DA-8C4A-F569-C1915B9B55B1", diary_title: "Pinceladas do Tempo", diary_main_text: "resources/Musée d Orsay/d1.json", diary_upload_datetime: "2023-03-01T12:30:30.000Z", diary_image: "resources/Musée d Orsay/1.jpg", diary_upload_username: "Zachary Butler"
            },
            {
                "diary_id": "17B9C94E-F829-6088-FA92-9A07EEA00A8E", diary_title: "Viagem pelo esplendor da arte francesa", diary_main_text: "resources/Musée d Orsay/d2.json", diary_upload_datetime: "2023-04-25T09:50:30.000Z", diary_image: "resources/Musée d Orsay/3.jpg", diary_upload_username: "Jake Clarke"
            }
        ],
    })

    await prisma.collection.createMany({
        data: [
            { "diary_id": "BA23617D-42DA-8C4A-F569-C1915B9B55B1" },
            { "diary_id": "17B9C94E-F829-6088-FA92-9A07EEA00A8E" }
        ],
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })