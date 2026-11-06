---
layout: article
title: Lina-Speech
subtitle: Gated Linear Attention and Initial-State Tuning for Multi-Sample Prompting Text-To-Speech Synthesis
date: 2024-10-22
category: "demo"
templateEngineOverride: njk
---
{%- macro play(src) -%}<audio controls preload="none" src="{{ src }}"></audio>{%- endmacro -%}
{%- macro speaker(name, text, extra) -%}
<td class="utt"><span class="utt__spk">{{ name }}{% if extra %} · {{ extra }}{% endif %}</span>{{ text }}</td>
{%- endmacro -%}

<div class="demo__header">
  <p class="demo__subtitle">{{ subtitle }}</p>
  <p class="demo__authors">
    <strong>Théodor Lemerle</strong><sup>1</sup>, Harrison Vanderbyl<sup>2</sup>, Vaibhav Srivastav<sup>3</sup>,
    Nicolas Obin<sup>1</sup>, Axel Roebel<sup>1</sup>
  </p>
  <p class="demo__affil"><sup>1</sup>IRCAM, STMS Lab · <sup>2</sup>RWKV Foundation, EleutherAI, Recursal AI · <sup>3</sup>Hugging Face</p>
  <p class="pub__meta">
    <a class="pill" href="https://proceedings.mlr.press/v312/lemerle26a.html">{{ icons.paper | safe }}PMLR</a>
    <a class="pill" href="https://arxiv.org/abs/2410.23320">{{ icons.arxiv | safe }}arXiv</a>
    <a class="pill" href="https://github.com/theodorblackbird/lina-speech">{{ icons.github | safe }}Code</a>
  </p>
</div>

<div class="demo__intro">
  <div>
    <p>
      Lina-Speech replaces self-attention with <strong>Gated Linear Attention</strong>. Because the model is
      recurrent, a voice can be cloned by tuning its <strong>initial state</strong> on several speech excerpts,
      instead of squeezing a single short prompt into the context window.
    </p>
  </div>
  <figure class="demo__figure">
    <img src="/assets/demo_lina/lina.png" alt="Lina-Speech architecture: GLA encoder and decoder with cross-attention, initialised from tuned initial states" width="742" height="547">
  </figure>
</div>

<section id="ist">
  <h2>Initial-state tuning vs prompt continuation</h2>
  <p>Cloning from <strong>multiple speech excerpts</strong> captures finer details of a speaker's identity than a single prompt. All speakers are <strong>unseen</strong>. VoiceCraft's target text is cropped when needed because of its limited context window.</p>
  <div class="table-scroll"><table>
    <thead><tr>
      <th>Speaker &amp; text</th><th>Original</th>
      <th class="is-ours">Lina-Speech<small>initial-state tuning</small></th>
      <th>Lina-Speech<small>prompt continuation</small></th>
      <th>VoiceCraft<small>prompt continuation</small></th>
    </tr></thead>
    <tbody>
    {%- for row in ist_manifest %}
    {% set base = "/assets/demo_lina/ist/" + row.folder + "/norm/" %}
    <tr>
      {{ speaker(row.speaker, row.text_target) }}
      <td>{{ play(base + "original.wav") }}</td>
      <td class="is-ours">{{ play(base + "ist.wav") }}</td>
      <td>{{ play(base + "no_ist.wav") }}</td>
      <td>{{ play(base + "voicecraft.wav") }}</td>
    </tr>
    {%- endfor %}
    </tbody>
  </table></div>
</section>

<section id="expresso">
  <h2>Expresso: speaking styles vs Parler-TTS</h2>
  <p>Evaluation samples from the paper. Samples are <strong>unseen</strong> by Lina-Speech, and an initial state is tuned for each (speaker, style) pair. Parler-TTS Mini was fine-tuned on Expresso.</p>
  <div class="table-scroll"><table>
    <thead><tr>
      <th>Speaker, style &amp; text</th><th>Reference</th>
      <th class="is-ours">Lina-Speech<small>initial-state tuning</small></th>
      <th>Parler-TTS Mini<small>text description</small></th>
    </tr></thead>
    <tbody>
    {%- for row in expresso_manifest %}
    <tr>
      {{ speaker(row.speaker_id, row.text_target, row.style) }}
      <td>{{ play("/assets/demo_lina/expresso/" + row.speaker_id + "_" + row.style + "_example.wav") }}</td>
      <td class="is-ours">{{ play("/assets/demo_lina/expresso/" + row.id + "_lina.wav") }}</td>
      <td>{{ play("/assets/demo_lina/expresso/" + row.id + "_parler.wav") }}</td>
    </tr>
    {%- endfor %}
    </tbody>
  </table></div>
</section>

<section id="libritts">
  <h2>LibriTTS vs Parler-TTS</h2>
  <p>Evaluation samples from the paper. Speakers are <strong>seen</strong> during training by both models.</p>
  <div class="table-scroll"><table>
    <thead><tr>
      <th>Speaker &amp; text</th><th>Reference</th>
      <th class="is-ours">Lina-Speech<small>initial-state tuning</small></th>
      <th>Parler-TTS Mini<small>text description</small></th>
    </tr></thead>
    <tbody>
    {%- for row in ltts_gpt_manifest %}
    <tr>
      {{ speaker(row.speaker, row.text_target) }}
      <td>{{ play("/assets/demo_lina/ltts_gpt/" + row.id + "_example.wav") }}</td>
      <td class="is-ours">{{ play("/assets/demo_lina/ltts_gpt/" + row.id + "_lina.wav") }}</td>
      <td>{{ play("/assets/demo_lina/ltts_gpt/" + row.id + "_parler.wav") }}</td>
    </tr>
    {%- endfor %}
    </tbody>
  </table></div>
</section>

<section id="zeroshot">
  <h2>Zero-shot voice cloning by prompt continuation</h2>
  <p>Evaluation samples from the LibriTTS test split. Speakers are <strong>unseen</strong> during training.</p>
  <div class="table-scroll"><table>
    <thead><tr>
      <th>Speaker &amp; text</th><th>Prompt</th>
      <th class="is-ours">Lina-Speech</th>
      <th>VoiceCraft</th><th>StyleTTS 2</th><th>VALL-E X<small>Plachtaa</small></th>
    </tr></thead>
    <tbody>
    {%- for row in zero_manifest %}
    {% set base = "/assets/demo_lina/zero/" + row.id + "_" %}
    <tr>
      {{ speaker("Speaker " + row.speaker_id, row.text_target) }}
      <td>{{ play(base + "prompt.wav") }}</td>
      <td class="is-ours">{{ play(base + "lina.wav") }}</td>
      <td>{{ play(base + "voicecraft.wav") }}</td>
      <td>{{ play(base + "styletts.wav") }}</td>
      <td>{{ play(base + "vallex.wav") }}</td>
    </tr>
    {%- endfor %}
    </tbody>
  </table></div>
</section>
