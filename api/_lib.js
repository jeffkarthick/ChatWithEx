import crypto from 'node:crypto';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

export const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? Redis.fromEnv() : null;
export const limiter = redis ? new Ratelimit({redis, limiter:Ratelimit.slidingWindow(30,'1 m'), analytics:true, prefix:'chatwithex'}) : null;
export const hash = s => crypto.createHash('sha256').update(String(s)).digest('hex');
export const token = () => crypto.randomBytes(24).toString('hex');
export const json = (res,status,data) => res.status(status).setHeader('Content-Type','application/json').json(data);
export function bodySize(req,max=700000){const len=Number(req.headers['content-length']||0); return !len || len<=max;}
export async function rate(req,key){ if(!limiter)return true; const r=await limiter.limit(key); return r.success; }
export async function groq(messages,maxTokens=1200){
 const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.GROQ_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.GROQ_MODEL||'llama-3.1-8b-instant',messages,temperature:.65,max_tokens:maxTokens})});
 const data=await r.json(); if(!r.ok) throw new Error('AI request failed'); return data.choices?.[0]?.message?.content||'';
}
export function safeText(x,max=12000){return typeof x==='string'?x.slice(0,max):'';}
