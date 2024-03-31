import io.github.cdimascio.dotenv.dotenv
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.features.json.serializer.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.util.*
import kotlinx.coroutines.*
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.jsonObject


val client = HttpClient(CIO) {
    install(ContentNegotiation) {
        json()
    }
}

@OptIn(InternalAPI::class)
suspend fun sendMessage(message: String, channelId: String, token: String): HttpResponse {
    val url = "https://discord.com/api/v9/channels/$channelId/messages"
    val json = """{"mobile_network_type":"unknown","content":"$message","nonce":"1223682375821557760","tts":false,"flags":0}""".trimIndent()

    return client.post(url) {
        header("Authorization", "Bot $token")
        contentType(ContentType.Application.Json)
        body = json
    }
}

suspend fun receiveMessage(channelId: String, token: String): HttpResponse {
    val url = "https://discord.com/api/v9/channels/$channelId/messages?limit=1"

    return client.get(url) {
        header("Authorization", "Bot $token")
        contentType(ContentType.Application.Json)
    }
}

fun main() = runBlocking<Unit> {
    embeddedServer(Netty, port = 8090) {
        routing {
            post("/send") {
                val message = call.receive<String>()
                val responseSend: HttpResponse = sendMessage(message, dotenv()["CHANNEL_ID"], dotenv()["DISCORD_TOKEN"])
                call.respondText("Message send: $message")
            }

            get("/messages") {
                val responseReceive: HttpResponse = receiveMessage(dotenv()["CHANNEL_ID"], dotenv()["DISCORD_TOKEN"])
                val content = responseReceive.body<JsonArray>().toList()[0].jsonObject.toMap()["content"].toString().removePrefix("\"").removeSuffix("\"")
                if(content.startsWith("!bot ")) {
                    call.respondText(content)
                }
            }
        }
    }.start(wait = true)
}